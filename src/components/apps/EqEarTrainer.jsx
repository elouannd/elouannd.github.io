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
    const analyserNodeRef = useRef(null)
    const fileBufferRef = useRef(null)
    const canvasRef = useRef(null)
    const visualizerAnimationRef = useRef(null)
    
    // Fun Visualizer State
    const [visualizerData, setVisualizerData] = useState({
        bars: Array(8).fill(0),
        bounce: 0,
        wiggle: 0
    })

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
    const [totalCorrect, setTotalCorrect] = useState(0)
    const [totalRounds, setTotalRounds] = useState(0)
    const [showStats, setShowStats] = useState(false)
    const [showHelp, setShowHelp] = useState(false)
    const [showMilestone, setShowMilestone] = useState(null)

    // Settings
    const [difficulty, setDifficulty] = useState('easy')
    const [sourceType, setSourceType] = useState('pink')
    const [gainDb, setGainDb] = useState(12)
    const [qFactor, setQFactor] = useState(1.0)
    const [eqMode, setEqMode] = useState('boost')
    const [language, setLanguage] = useState('en')
    const [visualizerEnabled, setVisualizerEnabled] = useState(true)

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
            visualizer: 'Visualizer',
            stats: 'Stats',
            help: 'Help',
            totalRounds: 'Total Rounds',
            accuracy: 'Accuracy',
            correct: 'Correct',
            resetStats: 'Reset Stats',
            close: 'Close',
            keyboardShortcuts: 'Keyboard Shortcuts',
            spaceBar: 'Space',
            toggleBypass: 'Toggle Bypass',
            enterKey: 'Enter',
            confirmGuess: 'Confirm Guess',
            escKey: 'Esc',
            stopAudio: 'Stop Audio',
            numKeys: '1-8',
            selectFreq: 'Select Frequency (Easy)',
            freqGuide: 'Frequency Guide',
            subBass: 'Sub Bass - Feel it',
            bass: 'Bass - Boom',
            lowMid: 'Low Mid - Body',
            mid: 'Mid - Presence',
            highMid: 'High Mid - Clarity',
            presence: 'Presence - Air',
            brilliance: 'Brilliance - Sparkle',
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
            visualizer: 'Visualiseur',
            stats: 'Stats',
            help: 'Aide',
            totalRounds: 'Total Manches',
            accuracy: 'Précision',
            correct: 'Correct',
            resetStats: 'Réinitialiser',
            close: 'Fermer',
            keyboardShortcuts: 'Raccourcis Clavier',
            spaceBar: 'Espace',
            toggleBypass: 'Activer/Désactiver Bypass',
            enterKey: 'Entrée',
            confirmGuess: 'Confirmer',
            escKey: 'Échap',
            stopAudio: 'Arrêter Audio',
            numKeys: '1-8',
            selectFreq: 'Sélectionner Fréquence (Facile)',
            freqGuide: 'Guide des Fréquences',
            subBass: 'Sub Basse - Ressenti',
            bass: 'Basse - Boom',
            lowMid: 'Bas Médium - Corps',
            mid: 'Médium - Présence',
            highMid: 'Haut Médium - Clarté',
            presence: 'Présence - Air',
            brilliance: 'Brillance - Éclat',
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
        
        // Load persisted stats from localStorage
        const savedStats = localStorage.getItem('eqTrainerStats')
        if (savedStats) {
            const stats = JSON.parse(savedStats)
            setBestStreak(stats.bestStreak || 0)
            setTotalCorrect(stats.totalCorrect || 0)
            setTotalRounds(stats.totalRounds || 0)
        }
    }, [])
    
    // Persist stats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('eqTrainerStats', JSON.stringify({
            bestStreak,
            totalCorrect,
            totalRounds
        }))
    }, [bestStreak, totalCorrect, totalRounds])
    
    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT') return
            
            switch (e.code) {
                case 'Space':
                    e.preventDefault()
                    if (isPlaying) toggleBypassWithRef()
                    break
                case 'Enter':
                    e.preventDefault()
                    if (selectedFreq && isPlaying && !feedback) {
                        handleInteraction(selectedFreq)
                    }
                    break
                case 'Escape':
                    if (isPlaying) stopAudio()
                    if (showStats) setShowStats(false)
                    if (showHelp) setShowHelp(false)
                    break
                case 'KeyS':
                    if (!isPlaying) startAudio()
                    break
                // Number keys 1-8 for easy mode frequency selection
                case 'Digit1':
                case 'Digit2':
                case 'Digit3':
                case 'Digit4':
                case 'Digit5':
                case 'Digit6':
                case 'Digit7':
                case 'Digit8':
                    if (isPlaying && difficulty === 'easy' && !feedback) {
                        const index = parseInt(e.code.replace('Digit', '')) - 1
                        if (easyFreqs[index]) {
                            handleInteraction(easyFreqs[index])
                        }
                    }
                    break
                case 'KeyB':
                    if (isPlaying && eqMode === 'mixed' && selectedFreq) {
                        handleGainTypeSelection('boost')
                    }
                    break
                case 'KeyC':
                    if (isPlaying && eqMode === 'mixed' && selectedFreq) {
                        handleGainTypeSelection('cut')
                    }
                    break
                default:
                    break
            }
        }
        
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isPlaying, isBypassed, selectedFreq, feedback, difficulty, eqMode, showStats, showHelp])

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

        // Create analyser node for the visualizer
        analyserNodeRef.current = audioContextRef.current.createAnalyser()
        analyserNodeRef.current.fftSize = 256
        analyserNodeRef.current.smoothingTimeConstant = 0.7

        filterNodeRef.current.connect(analyserNodeRef.current)
        analyserNodeRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)

        return () => {
            if (visualizerAnimationRef.current) {
                cancelAnimationFrame(visualizerAnimationRef.current)
            }
            if (audioContextRef.current) audioContextRef.current.close()
        }
    }, [])

    // Update Filter Params
    useEffect(() => {
        if (filterNodeRef.current) {
            filterNodeRef.current.Q.value = qFactor
        }
    }, [qFactor])

    // Fun Visualizer Animation Loop - Throttled for performance
    useEffect(() => {
        if (!isPlaying || !analyserNodeRef.current || !visualizerEnabled) {
            if (visualizerAnimationRef.current) {
                cancelAnimationFrame(visualizerAnimationRef.current)
            }
            setVisualizerData({ bars: Array(8).fill(0), bounce: 0, wiggle: 0 })
            return
        }

        const bufferLength = analyserNodeRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        let frame = 0
        let lastUpdate = 0
        const targetFps = 15 // Throttle to 15fps for performance
        const frameInterval = 1000 / targetFps

        const animate = (timestamp) => {
            visualizerAnimationRef.current = requestAnimationFrame(animate)
            
            // Throttle updates
            if (timestamp - lastUpdate < frameInterval) return
            lastUpdate = timestamp
            
            analyserNodeRef.current.getByteFrequencyData(dataArray)
            
            // Get 8 frequency bands for the silly bars
            const bars = []
            const bandSize = Math.floor(bufferLength / 8)
            for (let i = 0; i < 8; i++) {
                let sum = 0
                for (let j = 0; j < bandSize; j++) {
                    sum += dataArray[i * bandSize + j]
                }
                bars.push(sum / bandSize / 255) // Normalize to 0-1
            }

            // Calculate overall energy for bounce effect
            const totalEnergy = bars.reduce((a, b) => a + b, 0) / 8
            
            // Wiggle based on bass (first 2 bands)
            const bassEnergy = (bars[0] + bars[1]) / 2

            frame++
            setVisualizerData({
                bars,
                bounce: totalEnergy,
                wiggle: Math.sin(frame * 0.1) * bassEnergy * 10
            })
        }

        visualizerAnimationRef.current = requestAnimationFrame(animate)

        return () => {
            if (visualizerAnimationRef.current) {
                cancelAnimationFrame(visualizerAnimationRef.current)
            }
        }
    }, [isPlaying, visualizerEnabled])

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
                    // Milestone celebrations!
                    if (newStreak === 5) setShowMilestone('🔥 5 STREAK!')
                    else if (newStreak === 10) setShowMilestone('🎯 10 STREAK!')
                    else if (newStreak === 25) setShowMilestone('⭐ 25 STREAK!')
                    else if (newStreak === 50) setShowMilestone('🏆 50 STREAK!')
                    else if (newStreak === 100) setShowMilestone('👑 100 STREAK!')
                    return newStreak
                })
                setTotalCorrect(c => c + 1)
                setTotalRounds(r => r + 1)
                setFeedback({ type: 'correct', msg: 'PERFECT!' })
                setTimeout(() => {
                    setShowMilestone(null)
                    startNewRoundWithGain()
                }, 1000)
            } else {
                setStreak(0)
                setTotalRounds(r => r + 1)
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
                title="Free EQ Ear Trainer - Learn Frequency Recognition | Elouann"
                description="Master EQ frequency identification with our free interactive ear trainer. Features reactive audio visualizer, keyboard shortcuts, persistent stats tracking, streak system, and frequency guide. Perfect for audio engineers, music producers, and sound designers. Train with pink noise or your own audio files. No signup required."
                keywords="EQ ear training, frequency recognition, audio training, music production, sound engineering, ear training game, EQ practice, frequency identification, audio education, peaking EQ, parametric EQ, critical listening, mixing skills, mastering, audio engineer training, free EQ trainer, online ear training, frequency training tool, mixing engineer, sound design, audio visualizer, frequency guide, ear training app"
                canonicalPath="/eq-trainer"
            />
            <StructuredData
                type="webapp"
                data={{
                    name: 'EQ Ear Trainer',
                    description: 'Free interactive gamified EQ ear training application for audio professionals and enthusiasts. Train your frequency recognition skills with real-time audio processing, reactive audio visualizer, keyboard shortcuts, persistent statistics, and streak-based progression. Perfect for audio engineers, music producers, mixing engineers, and mastering engineers. No signup required.',
                    url: 'https://elouann.ca/eq-trainer',
                    category: 'MultimediaApplication',
                    languages: ['en', 'fr'],
                    features: [
                        'Interactive frequency identification game',
                        'Real-time EQ visualization with canvas',
                        'Fun reactive audio visualizer with dancing bars',
                        'Keyboard shortcuts for power users (Space, Enter, 1-8)',
                        'Persistent stats with localStorage (streak, accuracy, total rounds)',
                        'Milestone celebrations at 5, 10, 25, 50, 100 streaks',
                        'Comprehensive frequency guide with descriptions',
                        'Easy and Hard difficulty modes (8 vs 22 frequencies)',
                        'Pink noise generator or custom audio file upload',
                        'Adjustable Q factor (0.5-4.0) and gain (3-18dB)',
                        'Boost, cut, and mixed EQ modes',
                        'Bilingual interface (English/French) with auto-detection',
                        'File history management with IndexedDB',
                        'Accessibility: toggle visualizer for reduced motion',
                        'Mobile-responsive neo-brutalist design',
                        'No signup, no ads, completely free'
                    ]
                }}
            />
            <StructuredData
                type="breadcrumb"
                data={{
                    items: [
                        { name: 'Home', url: 'https://elouann.ca' },
                        { name: 'EQ Ear Trainer', url: 'https://elouann.ca/eq-trainer' }
                    ]
                }}
            />
            <div className="min-h-screen bg-brand-beige p-4 flex flex-col gap-4">

            {/* HUD Header - ENHANCED with corner brackets and indicators! */}
            <div className="relative flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-16 border-b-4 border-black pb-4 mb-4 bg-gradient-to-r from-white/20 via-white/40 to-white/20">
                {/* Decorative corner brackets - SO COOL! */}
                <div className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-t-4 border-l-4 border-brand-orange pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-t-4 border-r-4 border-brand-teal pointer-events-none" />

                {/* Current Streak with playful hover */}
                <div className="text-center relative group cursor-default">
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.currentStreak}</div>
                    <div className="relative">
                        <div 
                            className="text-3xl sm:text-5xl font-black text-brand-teal drop-shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110"
                            style={visualizerEnabled ? { transform: `scale(${1 + visualizerData.bounce * 0.1})` } : {}}
                        >
                            {streak}
                        </div>
                        {/* Flame indicator when streak > 0 */}
                        {streak > 0 && (
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-5 sm:h-5 bg-brand-orange border-2 border-black" />
                        )}
                    </div>
                </div>

                {/* FUN MUSICAL VISUALIZER - Dancing Bars! 🎵 */}
                {visualizerEnabled && (
                    <div className="flex items-end gap-1 sm:gap-1.5 h-12 sm:h-16 px-2 sm:px-4 order-last sm:order-none w-full sm:w-auto justify-center">
                        {visualizerData.bars.map((value, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col items-center gap-0.5"
                            >
                                {/* Main bar */}
                                <div
                                    className={`w-3 sm:w-4 border-2 border-black ${
                                        i % 2 === 0 ? 'bg-brand-orange' : 'bg-brand-teal'
                                    }`}
                                    style={{
                                        height: `${Math.max(6, value * 40)}px`,
                                        boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.3)',
                                    }}
                                />
                                {/* Silly bouncing dot on top */}
                                <div
                                    className={`w-1.5 sm:w-2 h-1.5 sm:h-2 border sm:border-2 border-black ${
                                        i % 2 === 0 ? 'bg-brand-teal' : 'bg-brand-orange'
                                    }`}
                                    style={{
                                        transform: `translateY(${-value * 8}px)`,
                                        opacity: 0.5 + value * 0.5
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Best Streak with trophy */}
                <div className="text-center relative group cursor-default">
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t.bestStreak}</div>
                    <div className="relative">
                        <div 
                            className="text-3xl sm:text-5xl font-black text-brand-orange drop-shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110"
                            style={visualizerEnabled ? { transform: `scale(${1 + visualizerData.bounce * 0.1})` } : {}}
                        >
                            {bestStreak}
                        </div>
                        {/* Trophy for milestone */}
                        {bestStreak >= 5 && (
                            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 border-2 border-black bg-yellow-300 flex items-center justify-center text-[10px] sm:text-xs shadow-brutal-sm group-hover:rotate-12 transition-transform">
                                ★
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Session info badge */}
                {totalRounds > 0 && (
                    <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-4 text-[10px] font-bold uppercase opacity-50">
                        {totalCorrect}/{totalRounds} ({totalRounds > 0 ? Math.round((totalCorrect / totalRounds) * 100) : 0}%)
                    </div>
                )}
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
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setVisualizerEnabled(!visualizerEnabled)}
                                    className={`text-xs font-bold uppercase px-3 py-1.5 border-2 border-black transition-all shadow-brutal-sm hover:shadow-brutal-pressed hover:translate-x-0.5 hover:translate-y-0.5 ${visualizerEnabled ? 'bg-brand-teal' : 'bg-gray-200'}`}
                                    title={t.visualizer}
                                    aria-label={`${t.visualizer}: ${visualizerEnabled ? 'ON' : 'OFF'}`}
                                >
                                    {visualizerEnabled ? '🎵' : '🔇'}
                                </button>
                                <button
                                    onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                                    className="text-xs font-bold uppercase px-3 py-1.5 border-2 border-black hover:bg-black hover:text-white transition-all shadow-brutal-sm hover:shadow-brutal-pressed hover:translate-x-0.5 hover:translate-y-0.5"
                                >
                                    {language.toUpperCase()}
                                </button>
                            </div>
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
                        {/* Background decorations */}
                        <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none" />
                        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-brand-orange/30 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-brand-teal/30 pointer-events-none" />

                        {/* Dancing silly shapes that react to music! 🎉 */}
                        {isPlaying && visualizerEnabled && (
                            <>
                                {/* Top left bouncy square */}
                                <div
                                    className="absolute top-8 left-8 w-6 h-6 bg-brand-orange border-2 border-black pointer-events-none z-30"
                                    style={{
                                        transform: `translateY(${-visualizerData.bars[0] * 15}px)`,
                                        opacity: 0.4 + visualizerData.bars[0] * 0.6
                                    }}
                                />
                                {/* Top right dancing diamond */}
                                <div
                                    className="absolute top-8 right-8 w-5 h-5 bg-brand-teal border-2 border-black pointer-events-none z-30 rotate-45"
                                    style={{
                                        transform: `translateY(${-visualizerData.bars[7] * 15}px) rotate(45deg)`,
                                        opacity: 0.4 + visualizerData.bars[7] * 0.6
                                    }}
                                />
                            </>
                        )}

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

                {/* Fun decorative dots that dance! */}
                {visualizerEnabled && (
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div 
                            className="w-2 h-2 bg-brand-orange border-2 border-black"
                            style={{ 
                                transform: `translateY(${-visualizerData.bars[0] * 6}px)`,
                            }}
                        />
                        <div 
                            className="w-2 h-2 bg-brand-teal border-2 border-black"
                            style={{ 
                                transform: `translateY(${-visualizerData.bars[3] * 6}px)`,
                            }}
                        />
                        <div 
                            className="w-2 h-2 bg-brand-orange border-2 border-black"
                            style={{ 
                                transform: `translateY(${-visualizerData.bars[7] * 6}px)`,
                            }}
                        />
                    </div>
                )}

                {/* Footer buttons */}
                <div className="flex items-center justify-center gap-4 mb-3">
                    <button
                        onClick={() => setShowStats(true)}
                        className="text-xs font-bold uppercase px-3 py-1.5 border-2 border-black bg-white hover:bg-brand-orange transition-all shadow-brutal-sm hover:shadow-brutal-pressed hover:translate-x-0.5 hover:translate-y-0.5"
                    >
                        📊 {t.stats}
                    </button>
                    <button
                        onClick={() => setShowHelp(true)}
                        className="text-xs font-bold uppercase px-3 py-1.5 border-2 border-black bg-white hover:bg-brand-teal transition-all shadow-brutal-sm hover:shadow-brutal-pressed hover:translate-x-0.5 hover:translate-y-0.5"
                    >
                        ❓ {t.help}
                    </button>
                </div>

                <p className="text-sm font-black uppercase opacity-70 tracking-wide">
                    {t.footer}
                </p>
            </div>
            
            {/* Stats Modal */}
            {showStats && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowStats(false)}>
                    <div className="bg-brand-beige border-4 border-black shadow-brutal-lg p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-3">
                            <h3 className="text-xl font-black uppercase">📊 {t.stats}</h3>
                            <button onClick={() => setShowStats(false)} className="text-2xl font-black hover:scale-110 transition-transform">×</button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-4 bg-white border-3 border-black shadow-brutal">
                                <div className="text-3xl font-black text-brand-teal">{streak}</div>
                                <div className="text-xs font-bold uppercase opacity-60">{t.currentStreak}</div>
                            </div>
                            <div className="text-center p-4 bg-white border-3 border-black shadow-brutal">
                                <div className="text-3xl font-black text-brand-orange">{bestStreak}</div>
                                <div className="text-xs font-bold uppercase opacity-60">{t.bestStreak}</div>
                            </div>
                            <div className="text-center p-4 bg-white border-3 border-black shadow-brutal">
                                <div className="text-3xl font-black">{totalRounds}</div>
                                <div className="text-xs font-bold uppercase opacity-60">{t.totalRounds}</div>
                            </div>
                            <div className="text-center p-4 bg-white border-3 border-black shadow-brutal">
                                <div className="text-3xl font-black text-green-600">
                                    {totalRounds > 0 ? Math.round((totalCorrect / totalRounds) * 100) : 0}%
                                </div>
                                <div className="text-xs font-bold uppercase opacity-60">{t.accuracy}</div>
                            </div>
                        </div>
                        
                        <div className="text-center mb-4">
                            <span className="text-sm font-bold">{totalCorrect} {t.correct} / {totalRounds} {t.totalRounds}</span>
                        </div>
                        
                        <button
                            onClick={() => {
                                setStreak(0)
                                setBestStreak(0)
                                setTotalCorrect(0)
                                setTotalRounds(0)
                                localStorage.removeItem('eqTrainerStats')
                            }}
                            className="w-full p-2 border-2 border-black bg-red-400 text-black font-bold uppercase text-sm hover:bg-red-500 transition-colors shadow-brutal-sm"
                        >
                            {t.resetStats}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Help Modal */}
            {showHelp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
                    <div className="bg-brand-beige border-4 border-black shadow-brutal-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-3">
                            <h3 className="text-xl font-black uppercase">❓ {t.help}</h3>
                            <button onClick={() => setShowHelp(false)} className="text-2xl font-black hover:scale-110 transition-transform">×</button>
                        </div>
                        
                        {/* Keyboard Shortcuts */}
                        <div className="mb-6">
                            <h4 className="font-black uppercase text-sm mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand-orange border-2 border-black flex items-center justify-center text-xs">⌨</span>
                                {t.keyboardShortcuts}
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center p-2 bg-white border-2 border-black">
                                    <kbd className="px-2 py-1 bg-gray-200 border border-black font-mono text-xs">{t.spaceBar}</kbd>
                                    <span className="font-bold">{t.toggleBypass}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white border-2 border-black">
                                    <kbd className="px-2 py-1 bg-gray-200 border border-black font-mono text-xs">{t.enterKey}</kbd>
                                    <span className="font-bold">{t.confirmGuess}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white border-2 border-black">
                                    <kbd className="px-2 py-1 bg-gray-200 border border-black font-mono text-xs">{t.escKey}</kbd>
                                    <span className="font-bold">{t.stopAudio}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white border-2 border-black">
                                    <kbd className="px-2 py-1 bg-gray-200 border border-black font-mono text-xs">{t.numKeys}</kbd>
                                    <span className="font-bold">{t.selectFreq}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Frequency Guide */}
                        <div>
                            <h4 className="font-black uppercase text-sm mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand-teal border-2 border-black flex items-center justify-center text-xs">🎵</span>
                                {t.freqGuide}
                            </h4>
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">20-60Hz</span>
                                    <span className="flex-1">{t.subBass}</span>
                                    <span className="w-4 h-4 bg-purple-400 border border-black"></span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">60-250Hz</span>
                                    <span className="flex-1">{t.bass}</span>
                                    <span className="w-4 h-4 bg-blue-400 border border-black"></span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">250-500Hz</span>
                                    <span className="flex-1">{t.lowMid}</span>
                                    <span className="w-4 h-4 bg-green-400 border border-black"></span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">500-2kHz</span>
                                    <span className="flex-1">{t.mid}</span>
                                    <span className="w-4 h-4 bg-yellow-400 border border-black"></span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">2k-4kHz</span>
                                    <span className="flex-1">{t.highMid}</span>
                                    <span className="w-4 h-4 bg-brand-orange border border-black"></span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">4k-8kHz</span>
                                    <span className="flex-1">{t.presence}</span>
                                    <span className="w-4 h-4 bg-red-400 border border-black"></span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-white border-2 border-black">
                                    <span className="font-black w-16">8k-20kHz</span>
                                    <span className="flex-1">{t.brilliance}</span>
                                    <span className="w-4 h-4 bg-pink-400 border border-black"></span>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setShowHelp(false)}
                            className="w-full mt-6 p-2 border-2 border-black bg-brand-teal text-black font-bold uppercase text-sm hover:bg-brand-orange transition-colors shadow-brutal-sm"
                        >
                            {t.close}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Milestone Celebration Overlay */}
            {showMilestone && (
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
                    <div className="animate-bounce">
                        <div className="bg-gradient-to-br from-yellow-300 to-brand-orange border-4 border-black shadow-brutal-lg px-8 py-6 transform rotate-2">
                            <div className="text-4xl sm:text-6xl font-black text-center text-black drop-shadow-[4px_4px_0px_rgba(255,255,255,0.5)]">
                                {showMilestone}
                            </div>
                        </div>
                    </div>
                    {/* Confetti-like decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-4 h-4 border-2 border-black ${i % 3 === 0 ? 'bg-brand-orange' : i % 3 === 1 ? 'bg-brand-teal' : 'bg-yellow-300'}`}
                                style={{
                                    left: `${10 + (i * 8)}%`,
                                    top: `${20 + (i % 4) * 15}%`,
                                    transform: `rotate(${i * 30}deg)`,
                                    animation: `fall ${1 + (i % 3) * 0.3}s ease-out forwards`
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
        </>
    )
}
