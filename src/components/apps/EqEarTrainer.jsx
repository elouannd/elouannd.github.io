import React, { useState, useEffect, useRef } from 'react'
import BrandCard from '../BrandCard'
import BrandButton from '../BrandButton'
import SEO from '../SEO'
import StructuredData from '../StructuredData'

export default function EqEarTrainer() {
    // Audio Context Refs
    const audioContextRef = useRef(null)
    const sourceNodeRef = useRef(null)
    const filterNodeRef = useRef(null)
    const gainNodeRef = useRef(null)
    const fileBufferRef = useRef(null)
    const canvasRef = useRef(null)

    // Game State
    const [isPlaying, setIsPlaying] = useState(false)
    const [isBypassed, setIsBypassed] = useState(false)
    const [targetFreq, setTargetFreq] = useState(null)
    const [targetGainType, setTargetGainType] = useState(null) // 'boost' or 'cut' for mixed mode
    const [selectedFreq, setSelectedFreq] = useState(null) // New: Selection state
    const [selectedGainType, setSelectedGainType] = useState(null) // User's boost/cut guess
    const [feedback, setFeedback] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [fileHistory, setFileHistory] = useState([])
    const [activeFileId, setActiveFileId] = useState(null)
    const [isHearingAnswer, setIsHearingAnswer] = useState(false)

    // Gamification State
    const [streak, setStreak] = useState(0)
    const [bestStreak, setBestStreak] = useState(0)

    // Settings
    const [difficulty, setDifficulty] = useState('easy')
    const [sourceType, setSourceType] = useState('pink')
    const [gainDb, setGainDb] = useState(12)
    const [qFactor, setQFactor] = useState(1.0)
    const [eqMode, setEqMode] = useState('boost')
    const [language, setLanguage] = useState('en')

    // Translations
    const translations = {
        en: {
            currentStreak: 'Current Streak',
            bestStreak: 'Best Streak',
            missionConfig: 'Mission Config',
            eqMode: 'EQ Mode',
            boost: 'boost',
            cut: 'cut',
            mixed: 'mixed',
            selectBoostOrCut: 'Select Boost or Cut',
            gain: 'Gain',
            qFactor: 'Q Factor',
            difficulty: 'Difficulty',
            easy: 'Easy',
            hard: 'Hard',
            source: 'Source',
            pink: 'Pink',
            file: 'File',
            fileHistory: 'File History',
            noFiles: 'No files uploaded yet',
            clear: 'Clear',
            load: 'Load',
            perfect: 'PERFECT!',
            miss: 'MISS!',
            confirmSelection: 'Confirm Selection',
            selectFrequency: 'Select Frequency',
            systemReady: 'System Ready',
            visualizerStandby: 'Visualizer Standby',
            confirm: 'Confirm?',
            initiate: 'INITIATE SEQUENCE',
            abort: 'ABORT MISSION',
            bypassed: 'BYPASSED',
            eqEngaged: 'EQ ENGAGED',
            hearMyAnswer: 'HEAR MY ANSWER',
            hearTarget: 'HEAR TARGET',
            adUnit: 'Ad Unit',
            language: 'Language',
            footer: 'Made by Elouann - 2025'
        },
        fr: {
            currentStreak: 'Série Actuelle',
            bestStreak: 'Meilleure Série',
            missionConfig: 'Config Mission',
            eqMode: 'Mode EQ',
            boost: 'boost',
            cut: 'cut',
            mixed: 'mixte',
            selectBoostOrCut: 'Sélectionner Boost ou Cut',
            gain: 'Gain',
            qFactor: 'Facteur Q',
            difficulty: 'Difficulté',
            easy: 'Facile',
            hard: 'Difficile',
            source: 'Source',
            pink: 'Rose',
            file: 'Fichier',
            fileHistory: 'Historique Fichiers',
            noFiles: 'Aucun fichier envoyé',
            clear: 'Effacer',
            load: 'Charger',
            perfect: 'PARFAIT!',
            miss: 'RATÉ!',
            confirmSelection: 'Confirmer Sélection',
            selectFrequency: 'Sélectionner Fréquence',
            systemReady: 'Système Prêt',
            visualizerStandby: 'Visualiseur en Veille',
            confirm: 'Confirmer?',
            initiate: 'LANCER SÉQUENCE',
            abort: 'ANNULER MISSION',
            bypassed: 'CONTOURNÉ',
            eqEngaged: 'EQ ACTIVÉ',
            hearMyAnswer: 'ÉCOUTER MA RÉPONSE',
            hearTarget: 'ÉCOUTER CIBLE',
            adUnit: 'Pub',
            language: 'Langue',
            footer: 'Créé par Elouann - 2025'
        }
    }

    const t = translations[language]

    // Auto-detect browser language on mount
    useEffect(() => {
        const browserLang = navigator.language || navigator.languages[0]
        if (browserLang.startsWith('fr')) {
            setLanguage('fr')
        }
    }, [])

    // Load AdSense script only on this page
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2369771525705184'
        script.async = true
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)

        return () => {
            // Cleanup: remove script when component unmounts
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [])

    // Frequencies
    const easyFreqs = [63, 125, 250, 500, 1000, 2000, 4000, 8000]
    const hardFreqs = [
        63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800,
        1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000
    ]
    const currentFreqs = difficulty === 'easy' ? easyFreqs : hardFreqs

    // IndexedDB Helpers
    const initDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('EqTrainerDB', 1)
            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result)
            request.onupgradeneeded = (event) => {
                const db = event.target.result
                if (!db.objectStoreNames.contains('files')) {
                    db.createObjectStore('files', { keyPath: 'id' })
                }
            }
        })
    }

    const saveFileToDB = (db, file) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['files'], 'readwrite')
            const store = transaction.objectStore('files')
            const request = store.put(file)
            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve()
        })
    }

    const getFilesFromDB = (db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['files'], 'readonly')
            const store = transaction.objectStore('files')
            const request = store.getAll()
            request.onerror = () => reject(request.error)
            request.onsuccess = () => {
                // Sort by uploadedAt desc
                const files = request.result.sort((a, b) => b.uploadedAt - a.uploadedAt)
                resolve(files)
            }
        })
    }

    const clearDB = async () => {
        const db = await initDB()
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['files'], 'readwrite')
            const store = transaction.objectStore('files')
            const request = store.clear()
            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve()
        })
    }

    // Load file history from IndexedDB on mount
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const db = await initDB()
                const files = await getFilesFromDB(db)
                setFileHistory(files)
            } catch (e) {
                console.error('Failed to load file history:', e)
            }
        }
        loadHistory()
    }, [])

    // Audio Init
    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        audioContextRef.current = new AudioContext()

        filterNodeRef.current = audioContextRef.current.createBiquadFilter()
        filterNodeRef.current.type = 'peaking'
        filterNodeRef.current.Q.value = qFactor
        filterNodeRef.current.gain.value = 0

        gainNodeRef.current = audioContextRef.current.createGain()
        gainNodeRef.current.gain.value = 0.5

        filterNodeRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)

        return () => {
            if (audioContextRef.current) audioContextRef.current.close()
        }
    }, [])

    // Update Filter Params
    useEffect(() => {
        if (filterNodeRef.current) {
            filterNodeRef.current.Q.value = qFactor
        }
    }, [qFactor])

    // Reactive Filter Frequency (User Response Listener)
    useEffect(() => {
        if (!filterNodeRef.current || !targetFreq) return

        let activeFreq = targetFreq // Default: always play target

        // In Easy Mode, allow hearing the answer when toggled
        if (difficulty === 'easy' && isHearingAnswer && selectedFreq) {
            activeFreq = selectedFreq
        }
        // In Hard Mode, always play target (no cheating)
        else {
            activeFreq = targetFreq
        }

        filterNodeRef.current.frequency.value = activeFreq
    }, [targetFreq, selectedFreq, isHearingAnswer, difficulty])

    // Visualizer Logic
    useEffect(() => {
        if (!canvasRef.current || !audioContextRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const width = canvas.width
        const height = canvas.height

        // Clear
        ctx.clearRect(0, 0, width, height)

        // Draw Grid
        ctx.strokeStyle = 'rgba(0,0,0,0.1)'
        ctx.lineWidth = 1
        ctx.beginPath()
        // Logarithmic grid lines (simplified)
        const logGrid = [63, 125, 250, 500, 1000, 2000, 4000, 8000]
        logGrid.forEach(f => {
            const x = (Math.log10(f / 20) / Math.log10(20000 / 20)) * width
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
        })
        ctx.stroke()

        // Draw Zero Line (positioned lower to leave space for buttons)
        const centerY = height * 0.75 // Center at 75% down
        ctx.strokeStyle = 'rgba(0,0,0,0.3)'
        ctx.beginPath()
        ctx.moveTo(0, centerY)
        ctx.lineTo(width, centerY)
        ctx.stroke()

        // If no selection, stop here
        if (!selectedFreq) return

        // Calculate Curve
        const sampleRate = audioContextRef.current.sampleRate
        const frequencyHz = new Float32Array(width)
        const magResponse = new Float32Array(width)
        const phaseResponse = new Float32Array(width)

        for (let i = 0; i < width; i++) {
            // Map pixel x to log frequency
            // x = (log10(f/min) / log10(max/min)) * width
            // f = min * 10^(x/width * log10(max/min))
            const f = 20 * Math.pow(10, (i / width) * Math.log10(20000 / 20))
            frequencyHz[i] = f
        }

        // Create a dummy filter to calculate response without affecting audio
        const dummyFilter = audioContextRef.current.createBiquadFilter()
        dummyFilter.type = 'peaking'
        dummyFilter.frequency.value = selectedFreq
        dummyFilter.Q.value = qFactor
        // Use current gain setting (or negative if cut mode)
        // For visualization, let's show what the user *would* get
        let visGain = gainDb
        if (eqMode === 'cut') {
            visGain = -gainDb
        } else if (eqMode === 'mixed') {
            // In mixed mode, show the user's selection if they've made one
            if (selectedGainType === 'cut') {
                visGain = -gainDb
            } else if (selectedGainType === 'boost') {
                visGain = gainDb
            } else {
                // No selection yet, default to boost
                visGain = gainDb
            }
        }
        dummyFilter.gain.value = visGain

        dummyFilter.getFrequencyResponse(frequencyHz, magResponse, phaseResponse)

        // Draw Curve
        ctx.strokeStyle = '#FFA666' // Brand Orange
        ctx.lineWidth = 3
        ctx.beginPath()

        for (let i = 0; i < width; i++) {
            // Mag is linear scale (1.0 = 0dB). Convert to dB for height
            // Map ±20dB to only 30% of height (instead of 50%) to prevent clipping
            const db = 20 * Math.log10(magResponse[i])
            const y = centerY - (db / 20) * (height * 0.3)

            if (i === 0) ctx.moveTo(i, y)
            else ctx.lineTo(i, y)
        }
        ctx.stroke()

    }, [selectedFreq, gainDb, qFactor, eqMode, selectedGainType])


    const startAudio = async () => {
        if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume()
        if (sourceNodeRef.current) sourceNodeRef.current.disconnect()

        // ... Source Creation (Pink/File) ...
        let source
        if (sourceType === 'pink') {
            const bufferSize = 2 * audioContextRef.current.sampleRate
            const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
            const data = buffer.getChannelData(0)
            let b0, b1, b2, b3, b4, b5, b6
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1
                b0 = 0.99886 * b0 + white * 0.0555179
                b1 = 0.99332 * b1 + white * 0.0750759
                b2 = 0.96900 * b2 + white * 0.1538520
                b3 = 0.86650 * b3 + white * 0.3104856
                b4 = 0.55000 * b4 + white * 0.5329522
                b5 = -0.7616 * b5 - white * 0.0168980
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
                data[i] *= 0.11
                b6 = white * 0.115926
            }
            source = audioContextRef.current.createBufferSource()
            source.buffer = buffer
            source.loop = true
        } else if (sourceType === 'file' && fileBufferRef.current) {
            source = audioContextRef.current.createBufferSource()
            source.buffer = fileBufferRef.current
            source.loop = true
        } else {
            // Fallback or error handling
            return
        }

        source.connect(filterNodeRef.current)
        source.start()
        sourceNodeRef.current = source

        setIsPlaying(true)
        startNewRoundWithGain()
    }

    const stopAudio = () => {
        if (sourceNodeRef.current) {
            sourceNodeRef.current.stop()
            sourceNodeRef.current.disconnect()
            sourceNodeRef.current = null
        }
        setIsPlaying(false)
        setFeedback(null)
        setSelectedFreq(null)
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            const arrayBuffer = await file.arrayBuffer()

            // Convert to base64 for storage FIRST (before decodeAudioData detaches the buffer)
            const base64 = arrayBufferToBase64(arrayBuffer)

            // Clone buffer for decoding because decodeAudioData detaches it
            const bufferForDecoding = arrayBuffer.slice(0)
            const audioBuffer = await audioContextRef.current.decodeAudioData(bufferForDecoding)

            const fileId = Date.now().toString()

            // Add to history
            const newFile = {
                id: fileId,
                name: file.name,
                data: base64,
                uploadedAt: Date.now()
            }

            // Save to DB
            const db = await initDB()
            await saveFileToDB(db, newFile)

            // Update State (reload from DB to ensure sync)
            const files = await getFilesFromDB(db)
            setFileHistory(files.slice(0, 10)) // Keep last 10 in UI

            // Set as active
            setFileName(file.name)
            setActiveFileId(fileId)
            fileBufferRef.current = audioBuffer
            setSourceType('file')

            // Force immediate playback if already playing
            if (isPlaying) {
                if (sourceNodeRef.current) {
                    sourceNodeRef.current.stop()
                    sourceNodeRef.current.disconnect()
                }
                const fileSource = audioContextRef.current.createBufferSource()
                fileSource.buffer = audioBuffer
                fileSource.loop = true
                fileSource.connect(filterNodeRef.current)
                fileSource.start()
                sourceNodeRef.current = fileSource
            }
        } catch (error) {
            console.error("Error uploading file:", error)
            alert("Failed to load audio file. Please try another file.")
        }
    }

    const loadFileFromHistory = async (fileItem) => {
        const arrayBuffer = base64ToArrayBuffer(fileItem.data)
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer)

        setFileName(fileItem.name)
        setActiveFileId(fileItem.id)
        fileBufferRef.current = audioBuffer
        setSourceType('file')

        // If currently playing, restart with new file
        if (isPlaying) {
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop()
                sourceNodeRef.current.disconnect()
            }
            const fileSource = audioContextRef.current.createBufferSource()
            fileSource.buffer = audioBuffer
            fileSource.loop = true
            fileSource.connect(filterNodeRef.current)
            fileSource.start()
            sourceNodeRef.current = fileSource
        }
    }

    const clearFileHistory = async () => {
        await clearDB()
        setFileHistory([])
    }

    // Helper functions for base64 conversion
    const arrayBufferToBase64 = (buffer) => {
        let binary = ''
        const bytes = new Uint8Array(buffer)
        const len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary)
    }

    const base64ToArrayBuffer = (base64) => {
        const binary = atob(base64)
        const len = binary.length
        const bytes = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        return bytes.buffer
    }

    const currentRoundGainRef = useRef(12)

    const startNewRoundWithGain = () => {
        const freqs = difficulty === 'easy' ? easyFreqs : hardFreqs
        const randomFreq = freqs[Math.floor(Math.random() * freqs.length)]

        setTargetFreq(randomFreq)
        setFeedback(null)
        setSelectedFreq(null) // Reset selection
        setSelectedGainType(null) // Reset gain type selection
        setIsHearingAnswer(false) // Reset toggle
        setIsBypassed(false)

        let targetGain = gainDb
        let gainType = 'boost' // Default

        if (eqMode === 'cut') {
            targetGain = -gainDb
            gainType = 'cut'
        } else if (eqMode === 'mixed') {
            const isBoost = Math.random() > 0.5
            targetGain = isBoost ? gainDb : -gainDb
            gainType = isBoost ? 'boost' : 'cut'
        }

        setTargetGainType(gainType)
        currentRoundGainRef.current = targetGain

        // Frequency is now set by the reactive effect
        filterNodeRef.current.gain.value = targetGain
    }

    const toggleBypassWithRef = () => {
        const newBypassState = !isBypassed
        setIsBypassed(newBypassState)
        if (newBypassState) {
            filterNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.1)
        } else {
            filterNodeRef.current.gain.setTargetAtTime(currentRoundGainRef.current, audioContextRef.current.currentTime, 0.1)
        }
    }

    const handleInteraction = (freq) => {
        if (!isPlaying || feedback) return

        if (selectedFreq === freq) {
            // In mixed mode, require both frequency and gain type selection before confirming
            if (eqMode === 'mixed' && !selectedGainType) {
                return // Don't confirm yet, need to select boost/cut
            }

            // Confirm Guess - check both frequency and gain type (in mixed mode)
            const freqCorrect = freq === targetFreq
            const gainTypeCorrect = eqMode === 'mixed' ? selectedGainType === targetGainType : true

            if (freqCorrect && gainTypeCorrect) {
                setStreak(s => {
                    const newStreak = s + 1
                    if (newStreak > bestStreak) setBestStreak(newStreak)
                    return newStreak
                })
                setFeedback({ type: 'correct', msg: 'PERFECT!' })
                setTimeout(() => startNewRoundWithGain(), 1000)
            } else {
                setStreak(0)
                let errorMsg = `MISS! ${targetFreq}Hz`
                if (eqMode === 'mixed') {
                    errorMsg += ` (${targetGainType})`
                }
                setFeedback({ type: 'wrong', msg: errorMsg })
                setTimeout(() => startNewRoundWithGain(), 1500)
            }
        } else {
            // Select
            setSelectedFreq(freq)
        }
    }

    const handleGainTypeSelection = (type) => {
        if (!isPlaying || feedback || eqMode !== 'mixed') return
        setSelectedGainType(type)
    }

    return (
        <>
            <SEO
                title="Elouann - EQ Trainer"
                description="Master EQ frequency identification with our free interactive ear trainer. Gamified learning with real-time audio visualization, streak tracking, XP system, and multiple difficulty levels. Perfect for audio engineers, music producers, mixing engineers, and sound designers. Train with pink noise or your own audio files. Available in English and French."
                keywords="EQ ear training, frequency recognition, audio training, music production, sound engineering, ear training game, EQ practice, frequency identification, audio education, peaking EQ, parametric EQ, critical listening, mixing skills, mastering, audio engineer training, free EQ trainer, online ear training, frequency training tool, mixing engineer, sound design"
                canonicalPath="/eq-trainer"
            />
            <StructuredData
                type="webapp"
                data={{
                    name: 'EQ Ear Trainer',
                    description: 'Free interactive gamified EQ ear training application for audio professionals and enthusiasts. Train your frequency recognition skills with real-time audio processing, multiple difficulty levels, and streak-based progression. Perfect for audio engineers, music producers, mixing engineers, and mastering engineers.',
                    url: 'https://elouann.me/eq-trainer',
                    category: 'MultimediaApplication',
                    languages: ['en', 'fr'],
                    features: [
                        'Interactive frequency identification game',
                        'Real-time EQ visualization',
                        'Gamification with XP and streak tracking',
                        'Easy and Hard difficulty modes',
                        'Pink noise or custom audio file sources',
                        'Adjustable Q factor and gain settings',
                        'Boost, cut, and mixed EQ modes',
                        'Bilingual interface (English/French)',
                        'File history management with IndexedDB',
                        'Responsive design for all devices'
                    ]
                }}
            />
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Home', url: 'https://elouann.me' },
                        { name: 'EQ Ear Trainer', url: 'https://elouann.me/eq-trainer' }
                    ]
                }}
            />
            <div className="min-h-screen bg-brand-beige p-4 flex flex-col gap-4">

            {/* HUD Header - ENHANCED with corner brackets and indicators! */}
            <div className="relative flex justify-center items-center gap-16 border-b-4 border-black pb-4 mb-4 bg-gradient-to-r from-white/20 via-white/40 to-white/20">
                {/* Decorative corner brackets - SO COOL! */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-brand-orange pointer-events-none" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-brand-teal pointer-events-none" />

                {/* Current Streak with playful hover */}
                <div className="text-center relative group cursor-default">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.currentStreak}</div>
                    <div className="relative">
                        <div className="text-5xl font-black text-brand-teal drop-shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110">
                            {streak}
                        </div>
                        {/* Flame indicator when streak > 0 - FIRE! 🔥 */}
                        {streak > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-orange border-2 border-black animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Best Streak with trophy */}
                <div className="text-center relative group cursor-default">
                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.bestStreak}</div>
                    <div className="relative">
                        <div className="text-5xl font-black text-brand-orange drop-shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110">
                            {bestStreak}
                        </div>
                        {/* Trophy for milestone - YOU'RE A CHAMPION! 🏆 */}
                        {bestStreak >= 5 && (
                            <div className="absolute -top-3 -right-3 w-6 h-6 border-2 border-black bg-yellow-300 flex items-center justify-center text-xs shadow-brutal-sm group-hover:rotate-12 transition-transform">
                                ★
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Panel: Settings */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <BrandCard cornerAccent={true} glassVariant="thick" className="flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b-4 border-black pb-3 mb-2">
                            <div className="flex items-center gap-2">
                                {/* Pulsing status indicator - ALIVE! */}
                                <div className="w-2 h-2 bg-brand-orange border-2 border-black animate-pulse" />
                                <h3 className="font-black uppercase text-lg">{t.missionConfig}</h3>
                            </div>
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                                className="text-xs font-bold uppercase px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white transition-all shadow-brutal-sm hover:shadow-brutal-pressed hover:translate-x-0.5 hover:translate-y-0.5"
                            >
                                {language.toUpperCase()}
                            </button>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">{t.eqMode}</label>
                            <div className="grid grid-cols-3 gap-1">
                                {['boost', 'cut', 'mixed'].map(m => (
                                    <button key={m} onClick={() => setEqMode(m)} className={`p-1 text-xs font-bold uppercase border-2 border-black ${eqMode === m ? 'bg-black text-white' : 'hover:bg-black/10'}`}>{t[m]}</button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">{t.gain}: {gainDb}dB</label>
                            <input type="range" min="3" max="18" step="3" value={gainDb} onChange={(e) => setGainDb(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">{t.qFactor}: {qFactor}</label>
                            <input type="range" min="0.5" max="4.0" step="0.5" value={qFactor} onChange={(e) => setQFactor(Number(e.target.value))} className="w-full accent-black" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">{t.difficulty}</label>
                            <div className="flex gap-2">
                                <button onClick={() => setDifficulty('easy')} className={`flex-1 border-2 border-black text-xs font-bold uppercase p-1 ${difficulty === 'easy' ? 'bg-brand-orange' : ''}`}>{t.easy}</button>
                                <button onClick={() => setDifficulty('hard')} className={`flex-1 border-2 border-black text-xs font-bold uppercase p-1 ${difficulty === 'hard' ? 'bg-brand-orange' : ''}`}>{t.hard}</button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase">{t.source}</label>
                            <div className="flex gap-2">
                                <button onClick={() => setSourceType('pink')} className={`flex-1 border-2 border-black text-xs font-bold uppercase p-1 ${sourceType === 'pink' ? 'bg-brand-teal' : ''}`}>{t.pink}</button>
                                <label className={`flex-1 border-2 border-black text-xs font-bold uppercase p-1 text-center cursor-pointer ${sourceType === 'file' ? 'bg-brand-teal' : ''}`}>
                                    {t.file}
                                    <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* File History - Always Visible */}
                        <div className="space-y-1 pt-2 border-t-2 border-black">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase">{t.fileHistory} {fileHistory.length > 0 && `(${fileHistory.length})`}</label>
                                {fileHistory.length > 0 && (
                                    <button
                                        onClick={clearFileHistory}
                                        className="text-[10px] font-bold uppercase text-red-600 hover:underline"
                                    >
                                        {t.clear}
                                    </button>
                                )}
                            </div>
                            {fileHistory.length === 0 ? (
                                <div className="text-[10px] text-black/40 italic py-2 text-center">
                                    {t.noFiles}
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {fileHistory.map((file) => (
                                        <button
                                            key={file.id}
                                            onClick={() => loadFileFromHistory(file)}
                                            className={`w-full flex items-center justify-between gap-1 p-1.5 border-2 border-black text-[10px] font-bold transition-all ${activeFileId === file.id
                                                ? 'bg-brand-teal -translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white/50 hover:bg-white hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                                }`}
                                        >
                                            <span className="truncate flex-1 text-left">{file.name}</span>
                                            {activeFileId === file.id && (
                                                <span className="text-[8px] uppercase">●</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </BrandCard>
                    <div className="flex-1 border-4 border-black border-dashed bg-black/5 flex items-center justify-center min-h-[100px]">
                        <span className="font-bold text-black/20 uppercase">{t.adUnit}</span>
                    </div>
                </div>

                {/* Center: Game Grid */}
                <div className="lg:col-span-9 flex flex-col gap-4">

                    {/* Feedback Area - ENHANCED with stars! */}
                    <div className="h-16 flex items-center justify-center relative">
                        {feedback ? (
                            <div className="relative z-10 text-center">
                                <div className={`inline-block bg-white/95 px-6 py-4 border-4 border-black relative ${feedback.type === 'correct' ? 'shadow-[10px_10px_0px_0px_#10b981] animate-bounce' : 'shadow-[10px_10px_0px_0px_#ef4444]'}`}>
                                    {/* Decorative stars for correct - CELEBRATION! ✨ */}
                                    {feedback.type === 'correct' && (
                                        <>
                                            <div className="absolute -top-3 -left-3 w-5 h-5 bg-yellow-300 border-2 border-black flex items-center justify-center text-xs shadow-brutal-sm">★</div>
                                            <div className="absolute -top-3 -right-3 w-5 h-5 bg-yellow-300 border-2 border-black flex items-center justify-center text-xs shadow-brutal-sm">★</div>
                                        </>
                                    )}

                                    <div className={`text-4xl font-black uppercase ${feedback.type === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                        {feedback.msg}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center opacity-50">
                                <div className="text-2xl font-black uppercase tracking-widest">
                                    {isPlaying ? (
                                        selectedFreq ? (
                                            eqMode === 'mixed' && !selectedGainType ? t.selectBoostOrCut : t.confirmSelection
                                        ) : t.selectFrequency
                                    ) : t.systemReady}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-gradient-to-br from-white/50 to-white/30 border-4 border-black p-6 shadow-brutal-lg relative overflow-hidden flex flex-col">
                        {/* Background decorations - PLAYFUL! */}
                        <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none" />
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-brand-orange/30 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-brand-teal/30 pointer-events-none" />

                        {/* Visualizer Canvas with enhanced glow */}
                        <canvas ref={canvasRef} width={800} height={400} className="absolute inset-0 w-full h-full opacity-60 drop-shadow-[0_0_30px_rgba(255,166,102,0.2)]" />

                        {!selectedFreq && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                <span className="font-bold uppercase text-4xl">{t.visualizerStandby}</span>
                            </div>
                        )}

                        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-10 z-10">
                            <div className="border-r border-black"></div>
                            <div className="border-r border-black"></div>
                            <div className="border-r border-black"></div>
                        </div>

                        <div className={`relative z-20 grid gap-3 ${difficulty === 'easy' ? 'grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8' : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11'}`}>
                            {currentFreqs.map((freq) => (
                                <button
                                    key={freq}
                                    onClick={() => handleInteraction(freq)}
                                    disabled={!isPlaying || feedback !== null}
                                    className={`
                                group relative aspect-square flex flex-col items-center justify-center
                                border-4 border-black overflow-hidden
                                ${selectedFreq === freq ? 'bg-brand-orange scale-105 shadow-brutal-lg rotate-1' : 'bg-white shadow-brutal'}
                                hover:scale-105 hover:shadow-brutal-lg hover:rotate-1
                                active:scale-95 active:shadow-brutal-pressed active:rotate-0
                                transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-brutal-sm
                            `}
                                >
                                    {/* Corner accent when selected */}
                                    {selectedFreq === freq && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-black border-2 border-black z-10" />
                                    )}

                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

                                    <span className="text-lg font-black relative z-10 group-hover:scale-110 transition-transform">{freq >= 1000 ? `${freq / 1000}k` : freq}</span>
                                    <span className="text-[10px] font-bold uppercase opacity-50 relative z-10">Hz</span>
                                    {selectedFreq === freq && (
                                        <span className="text-[8px] font-black uppercase mt-1 relative z-10 animate-pulse">{t.confirm}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Boost/Cut Selector - Only in Mixed Mode */}
                    {eqMode === 'mixed' && selectedFreq && isPlaying && !feedback && (
                        <div className="glass-thick border-4 border-black p-6 shadow-brutal-lg relative overflow-hidden animate-slide-in-bottom">
                            {/* Corner brackets */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-l-4 border-t-4 border-brand-orange" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-r-4 border-t-4 border-brand-teal" />

                            <div className="text-center mb-4">
                                <span className="text-sm font-black uppercase opacity-70 tracking-wide">{t.selectBoostOrCut}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleGainTypeSelection('boost')}
                                    className={`
                                        group relative p-4 border-4 border-black font-black uppercase text-xl tracking-wider overflow-hidden
                                        ${selectedGainType === 'boost'
                                            ? 'bg-green-400 scale-105 shadow-brutal-lg rotate-1'
                                            : 'bg-white shadow-brutal hover:scale-105 hover:shadow-brutal-lg hover:rotate-1'}
                                        active:scale-95 active:shadow-brutal-pressed active:rotate-0
                                        transition-all duration-200
                                    `}
                                >
                                    {/* Corner accent when selected */}
                                    {selectedGainType === 'boost' && (
                                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-black border-2 border-black z-10" />
                                    )}
                                    {/* Arrow that bounces */}
                                    <span className="inline-block group-hover:-translate-y-1 transition-transform">BOOST ↑</span>
                                </button>
                                <button
                                    onClick={() => handleGainTypeSelection('cut')}
                                    className={`
                                        group relative p-4 border-4 border-black font-black uppercase text-xl tracking-wider overflow-hidden
                                        ${selectedGainType === 'cut'
                                            ? 'bg-red-400 scale-105 shadow-brutal-lg -rotate-1'
                                            : 'bg-white shadow-brutal hover:scale-105 hover:shadow-brutal-lg hover:-rotate-1'}
                                        active:scale-95 active:shadow-brutal-pressed active:rotate-0
                                        transition-all duration-200
                                    `}
                                >
                                    {/* Corner accent when selected */}
                                    {selectedGainType === 'cut' && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-black border-2 border-black z-10" />
                                    )}
                                    {/* Arrow that bounces */}
                                    <span className="inline-block group-hover:translate-y-1 transition-transform">CUT ↓</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bottom Controls */}
                    <div className={`grid gap-4 ${difficulty === 'easy' && selectedFreq && isPlaying ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        <BrandButton
                            onClick={isPlaying ? stopAudio : startAudio}
                            className={`group w-full relative overflow-hidden ${isPlaying ? 'bg-red-500 text-white' : 'bg-green-500'}`}
                        >
                            {/* Animated dot when playing */}
                            {isPlaying && (
                                <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                            )}
                            {isPlaying ? t.abort : t.initiate}
                        </BrandButton>

                        <button
                            onClick={toggleBypassWithRef}
                            disabled={!isPlaying}
                            className={`
                        group relative w-full border-4 border-black font-black uppercase text-lg tracking-wider overflow-hidden
                        ${isBypassed ? 'bg-gray-300 text-gray-600 shadow-brutal-sm' : 'bg-yellow-400 text-black shadow-brutal'}
                        hover:scale-105 hover:shadow-brutal-lg hover:rotate-1
                        active:scale-95 active:shadow-brutal-pressed active:rotate-0
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0
                        transition-all duration-200
                    `}
                        >
                            {/* Corner accent when engaged */}
                            {!isBypassed && isPlaying && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-black border-2 border-black z-10" />
                            )}
                            {isBypassed ? t.bypassed : t.eqEngaged}
                        </button>

                        {/* Toggle: Hear Answer - Only in Easy Mode */}
                        {difficulty === 'easy' && selectedFreq && isPlaying && (
                            <button
                                onClick={() => setIsHearingAnswer(!isHearingAnswer)}
                                className={`
                                    group relative w-full border-4 border-black font-black uppercase text-lg tracking-wider overflow-hidden
                                    ${isHearingAnswer ? 'bg-brand-orange text-black shadow-brutal-lg scale-105 rotate-1' : 'bg-blue-400 text-black shadow-brutal'}
                                    hover:scale-105 hover:shadow-brutal-lg hover:rotate-1
                                    active:scale-95 active:shadow-brutal-pressed active:rotate-0
                                    transition-all duration-200
                                `}
                            >
                                {/* Corner accent when hearing answer */}
                                {isHearingAnswer && (
                                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-black border-2 border-black z-10" />
                                )}
                                {/* Speaker icon that pulses when active */}
                                {isHearingAnswer && (
                                    <span className="inline-block mr-2 animate-pulse">🔊</span>
                                )}
                                {isHearingAnswer ? t.hearTarget : t.hearMyAnswer}
                            </button>
                        )}
                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="text-center py-6 border-t-4 border-black/10 relative">
                {/* Decorative accent lines */}
                <div className="absolute left-0 top-0 w-24 h-1 bg-brand-orange" />
                <div className="absolute right-0 top-0 w-24 h-1 bg-brand-teal" />

                {/* Fun decorative dots */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-brand-orange border-2 border-black rotate-45" />
                    <div className="w-2 h-2 bg-brand-teal border-2 border-black" />
                    <div className="w-2 h-2 bg-brand-orange border-2 border-black rotate-45" />
                </div>

                <p className="text-sm font-black uppercase opacity-70 tracking-wide">{t.footer}</p>
            </div>
        </div>
        </>
    )
}
