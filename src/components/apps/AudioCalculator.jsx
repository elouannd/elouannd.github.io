import React, { useState, useEffect } from 'react';
import BrandCard from '../BrandCard';
import BrandButton from '../BrandButton';

const translations = {
    en: {
        title: 'Audio Calc',
        subtitle: 'Essential tools for audio engineers',
        categories: {
            decibels: 'Decibels',
            frequency: 'Frequency & Wavelength',
            time: 'Time & Delay',
            digital: 'Sample Rate & Bit Depth',
            acoustics: 'Room Acoustics',
            speakers: 'Speakers & PA',
            mics: 'Microphones',
            eq: 'Filter & EQ',
            dynamics: 'Dynamics',
            electrical: 'Electrical'
        },
        labels: {
            voltage: 'Signal Voltage',
            refVoltage: 'Reference',
            power: 'Target Power',
            refPower: 'Reference',
            gainLoss: 'Gain / Loss',
            voltageRatio: 'Voltage Ratio',
            powerRatio: 'Power Ratio',
            freq: 'Frequency',
            temp: 'Temperature',
            speedSound: 'Speed of sound',
            wavelength: 'Wavelength',
            refA4: 'Reference A4',
            semitones: 'Semitones from A4',
            tempo: 'Tempo',
            distance: 'Distance',
            delayNeeded: 'Delay Needed',
            sampleRate: 'Sample Rate',
            bitDepth: 'Bit Depth',
            channels: 'Channels',
            duration: 'Duration',
            sizeMB: 'Size (MB)',
            sizeGB: 'Size (GB)',
            length: 'Length',
            width: 'Width',
            height: 'Height',
            mode: 'Mode',
            refSPL: 'Ref SPL',
            refDist: 'Ref Dist',
            targetDist: 'Target Distance',
            splTarget: 'SPL at Target',
            lowFreq: 'Lowest Freq to Capture',
            spacing: 'Recommended Spacing',
            qFactor: 'Q Factor',
            centerFreq: 'Center Freq',
            bandwidth: 'Bandwidth',
            attack: 'Attack Time',
            transientFreq: 'Transient Freq',
            volts: 'Voltage (V)',
            current: 'Current (I)',
            watts: 'Power (P)',
            ohms: 'Resistance (R)',
            note: 'Note'
        },
        sections: {
            voltageToDb: 'Voltage Ratio to dB',
            powerToDb: 'Power Ratio to dB',
            dbToLinear: 'dB to Linear Ratio',
            wavelength: 'Wavelength Calculator',
            notePitch: 'Note Pitch Calculator',
            bpmDelay: 'BPM to Delay Time',
            distTime: 'Distance to Time Alignment',
            fileSize: 'Audio File Size Estimator',
            roomModes: 'Room Modes (Axial)',
            splDist: 'SPL at Distance (Inverse Square)',
            stereoSpacing: 'A/B Stereo Spacing Guide',
            qConv: 'Q-Factor Converter',
            compAttack: 'Compressor Attack to Frequency',
            ohmsLaw: "Ohm's Law (Power)"
        },
        notes: {
            dbRef: '*Ref: 0.775V = dBu, 1V = dBV',
            spl: 'Assumes free field (outdoor) conditions. -6dB per doubling of distance.',
            stereo: 'Based on 30 × (λ / 2) rule of thumb for good stereo image.',
            comp: 'Frequencies above this will pass through before full compression kicks in.'
        },
        footer: 'Made by Elouann - 2025'
    },
    fr: {
        title: 'Audio Calc',
        subtitle: 'Outils essentiels pour ingénieurs du son',
        categories: {
            decibels: 'Décibels',
            frequency: 'Fréquence & Longueur d\'onde',
            time: 'Temps & Délai',
            digital: 'Fréquence d\'échantillonnage',
            acoustics: 'Acoustique',
            speakers: 'Haut-parleurs & PA',
            mics: 'Microphones',
            eq: 'Filtre & EQ',
            dynamics: 'Dynamique',
            electrical: 'Électricité'
        },
        labels: {
            voltage: 'Tension Signal',
            refVoltage: 'Référence',
            power: 'Puissance Cible',
            refPower: 'Référence',
            gainLoss: 'Gain / Perte',
            voltageRatio: 'Ratio Tension',
            powerRatio: 'Ratio Puissance',
            freq: 'Fréquence',
            temp: 'Température',
            speedSound: 'Vitesse du son',
            wavelength: 'Longueur d\'onde',
            refA4: 'Référence A4',
            semitones: 'Demi-tons depuis A4',
            tempo: 'Tempo',
            distance: 'Distance',
            delayNeeded: 'Délai Requis',
            sampleRate: 'Fréquence d\'éch.',
            bitDepth: 'Profondeur de bits',
            channels: 'Canaux',
            duration: 'Durée',
            sizeMB: 'Taille (Mo)',
            sizeGB: 'Taille (Go)',
            length: 'Longueur',
            width: 'Largeur',
            height: 'Hauteur',
            mode: 'Mode',
            refSPL: 'SPL Réf',
            refDist: 'Dist Réf',
            targetDist: 'Distance Cible',
            splTarget: 'SPL à la Cible',
            lowFreq: 'Fréq Min à Capturer',
            spacing: 'Espacement Recommandé',
            qFactor: 'Facteur Q',
            centerFreq: 'Fréq Centrale',
            bandwidth: 'Bande passante',
            attack: 'Temps d\'attaque',
            transientFreq: 'Fréq Transitoire',
            volts: 'Tension (V)',
            current: 'Courant (I)',
            watts: 'Puissance (P)',
            ohms: 'Résistance (R)',
            note: 'Note'
        },
        sections: {
            voltageToDb: 'Ratio Tension vers dB',
            powerToDb: 'Ratio Puissance vers dB',
            dbToLinear: 'dB vers Ratio Linéaire',
            wavelength: 'Calculateur Longueur d\'onde',
            notePitch: 'Calculateur Hauteur Note',
            bpmDelay: 'BPM vers Temps de Délai',
            distTime: 'Alignement Distance / Temps',
            fileSize: 'Estimateur Taille Fichier',
            roomModes: 'Modes de Pièce (Axial)',
            splDist: 'SPL à Distance (Carré Inverse)',
            stereoSpacing: 'Guide Espacement Stéréo A/B',
            qConv: 'Convertisseur Facteur Q',
            compAttack: 'Attaque Compresseur vers Fréq',
            ohmsLaw: "Loi d'Ohm (Puissance)"
        },
        notes: {
            dbRef: '*Réf: 0.775V = dBu, 1V = dBV',
            spl: 'Suppose champ libre (extérieur). -6dB par doublement de distance.',
            stereo: 'Basé sur la règle 30 × (λ / 2) pour une bonne image stéréo.',
            comp: 'Les fréquences au-dessus passeront avant la compression totale.'
        },
        footer: 'Fait par Elouann - 2025'
    }
};

const AudioCalculator = () => {
    const [activeCategory, setActiveCategory] = useState('decibels');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const browserLang = navigator.language || navigator.languages[0];
        if (browserLang.startsWith('fr')) {
            setLanguage('fr');
        }
    }, []);

    const t = translations[language];

    const handleCategorySelect = (id) => {
        setActiveCategory(id);
        setIsSidebarOpen(false);
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'fr' : 'en');
    };

    const categories = [
        { id: 'decibels', name: t.categories.decibels, icon: '🔊' },
        { id: 'frequency', name: t.categories.frequency, icon: '〰️' },
        { id: 'time', name: t.categories.time, icon: '⏱️' },
        { id: 'digital', name: t.categories.digital, icon: '💾' },
        { id: 'acoustics', name: t.categories.acoustics, icon: '🏠' },
        { id: 'speakers', name: t.categories.speakers, icon: '📢' },
        { id: 'mics', name: t.categories.mics, icon: '🎤' },
        { id: 'eq', name: t.categories.eq, icon: '🎚️' },
        { id: 'dynamics', name: t.categories.dynamics, icon: '📉' },
        { id: 'electrical', name: t.categories.electrical, icon: '⚡' },
    ];

    return (
        <div className="min-h-screen bg-brand-beige p-4 md:p-8 font-sans text-black animate-slide-in-bottom">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">
                            Audio <span className="text-brand-teal">Calc</span>
                        </h1>
                        <p className="font-serif italic text-sm md:text-lg opacity-80">
                            {t.subtitle}
                        </p>
                    </div>
                    <div className="flex gap-2 md:gap-4">
                        <BrandButton
                            onClick={toggleLanguage}
                            size="sm"
                            variant="orange"
                            className="min-w-[60px]"
                        >
                            {language === 'en' ? 'FR' : 'EN'}
                        </BrandButton>
                        <BrandButton
                            className="md:hidden !px-3"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            variant="teal"
                        >
                            {isSidebarOpen ? '✕' : '☰'}
                        </BrandButton>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-8 relative">
                    {/* Sidebar Navigation */}
                    <nav className={`
            fixed md:relative inset-0 z-50 md:z-auto bg-brand-beige/95 md:bg-transparent p-6 md:p-0
            transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            transition-transform duration-300 ease-in-out
            w-full md:w-64 flex-shrink-0
            border-r-0 md:border-none
            overflow-y-auto
          `}>
                        <div className="flex justify-between items-center md:hidden mb-8">
                            <span className="font-bold text-2xl uppercase">Categories</span>
                            <BrandButton onClick={() => setIsSidebarOpen(false)} size="sm" variant="teal">✕</BrandButton>
                        </div>
                        <div className="space-y-3 pb-20 md:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className={`
                    w-full text-left p-4 border-4 border-black font-bold flex items-center gap-3
                    transition-all duration-200 uppercase tracking-wide text-sm md:text-base
                    ${activeCategory === cat.id
                                            ? 'bg-black text-white shadow-brutal-pressed translate-x-[2px] translate-y-[2px]'
                                            : 'bg-white hover:bg-brand-teal hover:shadow-brutal shadow-brutal-sm hover:-translate-y-1 hover:-rotate-1'
                                        }
                  `}
                                >
                                    <span className="text-xl">{cat.icon}</span>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Main Content Area */}
                    <main className="flex-1 min-h-[500px]">
                        <BrandCard className="bg-white" shadowVariant="lg">
                            <h2 className="text-2xl md:text-3xl font-black mb-8 uppercase border-b-4 border-black pb-2 inline-block">
                                {categories.find(c => c.id === activeCategory)?.name}
                            </h2>

                            <div className="space-y-12 animate-slide-in-bottom">
                                {activeCategory === 'decibels' && <DecibelsCalculator t={t} />}
                                {activeCategory === 'frequency' && <FrequencyCalculator t={t} />}
                                {activeCategory === 'time' && <TimeCalculator t={t} />}
                                {activeCategory === 'digital' && <DigitalCalculator t={t} />}
                                {activeCategory === 'acoustics' && <AcousticsCalculator t={t} />}
                                {activeCategory === 'speakers' && <SpeakersCalculator t={t} />}
                                {activeCategory === 'mics' && <MicsCalculator t={t} />}
                                {activeCategory === 'eq' && <EQCalculator t={t} />}
                                {activeCategory === 'dynamics' && <DynamicsCalculator t={t} />}
                                {activeCategory === 'electrical' && <ElectricalCalculator t={t} />}
                            </div>
                        </BrandCard>
                    </main>
                </div>

                {/* Footer */}
                <footer className="mt-16 border-t-4 border-black pt-8 pb-8 text-center">
                    <p className="font-bold text-lg mb-2">{t.footer}</p>
                    <p className="font-mono text-sm opacity-60">Copyright © 2025</p>
                    <a href="mailto:contact@elouann.com" className="inline-block mt-2 text-brand-teal font-bold hover:underline hover:text-brand-orange transition-colors">
                        contact@elouann.com
                    </a>
                </footer>
            </div>
        </div>
    );
};

// --- Utility Components ---

const CalcSection = ({ title, children }) => (
    <div className="bg-gray-50 border-4 border-black p-4 md:p-6 relative hover:shadow-brutal-sm transition-all duration-300 hover:-translate-y-1">
        <div className="absolute -top-4 left-4 bg-brand-orange border-4 border-black px-3 py-1 text-xs font-black uppercase tracking-wider shadow-brutal-sm">
            {title}
        </div>
        <div className="mt-4 space-y-6">
            {children}
        </div>
    </div>
);

const InputGroup = ({ label, value, onChange, unit, type = "number", step = "any" }) => (
    <div className="flex flex-col w-full">
        <label className="text-xs font-bold uppercase mb-2 opacity-70 tracking-wider">{label}</label>
        <div className="flex group w-full shadow-brutal-sm hover:shadow-brutal transition-shadow">
            <input
                type={type}
                step={step}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 border-4 border-black border-r-0 p-3 font-mono text-base md:text-lg focus:outline-none focus:bg-brand-beige transition-colors w-full min-w-0"
            />
            {unit && (
                <span className="bg-black text-white border-4 border-black px-3 md:px-4 py-2 text-sm md:text-base font-bold flex items-center justify-center min-w-[3.5rem]">
                    {unit}
                </span>
            )}
        </div>
    </div>
);

const ResultBox = ({ label, value, unit }) => (
    <div className="bg-black text-white p-4 md:p-5 border-4 border-black shadow-brutal-sm mt-4 hover:scale-[1.02] hover:rotate-1 transition-all duration-200">
        <div className="text-xs font-bold uppercase opacity-60 mb-1 tracking-wider">{label}</div>
        <div className="text-2xl md:text-3xl font-mono font-bold truncate">
            {value} <span className="text-sm md:text-base opacity-60 ml-1">{unit}</span>
        </div>
    </div>
);

// --- Calculator Components ---

const DecibelsCalculator = ({ t }) => {
    const [volts1, setVolts1] = useState(1);
    const [volts2, setVolts2] = useState(0.775);
    const dbVoltage = (20 * Math.log10(volts1 / volts2)).toFixed(2);

    const [watts1, setWatts1] = useState(100);
    const [watts2, setWatts2] = useState(1);
    const dbPower = (10 * Math.log10(watts1 / watts2)).toFixed(2);

    const [dbVal, setDbVal] = useState(6);
    const ratioVolts = Math.pow(10, dbVal / 20).toFixed(3);
    const ratioPower = Math.pow(10, dbVal / 10).toFixed(3);

    return (
        <>
            <CalcSection title={t.sections.voltageToDb}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label={t.labels.voltage} value={volts1} onChange={setVolts1} unit="V" />
                    <InputGroup label={t.labels.refVoltage} value={volts2} onChange={setVolts2} unit="V" />
                </div>
                <ResultBox label={t.labels.gainLoss} value={dbVoltage} unit="dB" />
                <p className="text-xs opacity-60 mt-2 font-mono">{t.notes.dbRef}</p>
            </CalcSection>

            <CalcSection title={t.sections.powerToDb}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label={t.labels.power} value={watts1} onChange={setWatts1} unit="W" />
                    <InputGroup label={t.labels.refPower} value={watts2} onChange={setWatts2} unit="W" />
                </div>
                <ResultBox label={t.labels.gainLoss} value={dbPower} unit="dB" />
            </CalcSection>

            <CalcSection title={t.sections.dbToLinear}>
                <InputGroup label="dB Value" value={dbVal} onChange={setDbVal} unit="dB" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <ResultBox label={t.labels.voltageRatio} value={ratioVolts} unit="×" />
                    <ResultBox label={t.labels.powerRatio} value={ratioPower} unit="×" />
                </div>
            </CalcSection>
        </>
    );
};

const FrequencyCalculator = ({ t }) => {
    const [freq, setFreq] = useState(100);
    const [temp, setTemp] = useState(20);
    const speedOfSound = 331.3 + (0.606 * temp);
    const wavelength = (speedOfSound / freq).toFixed(3);

    const [noteA4, setNoteA4] = useState(440);
    const [semitones, setSemitones] = useState(0);
    const targetFreq = (noteA4 * Math.pow(2, semitones / 12)).toFixed(2);

    return (
        <>
            <CalcSection title={t.sections.wavelength}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label={t.labels.freq} value={freq} onChange={setFreq} unit="Hz" />
                    <InputGroup label={t.labels.temp} value={temp} onChange={setTemp} unit="°C" />
                </div>
                <div className="text-xs mt-2 mb-2 font-mono opacity-70">{t.labels.speedSound}: {speedOfSound.toFixed(1)} m/s</div>
                <ResultBox label={t.labels.wavelength} value={wavelength} unit="m" />
            </CalcSection>

            <CalcSection title={t.sections.notePitch}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label={t.labels.refA4} value={noteA4} onChange={setNoteA4} unit="Hz" />
                    <InputGroup label={t.labels.semitones} value={semitones} onChange={setSemitones} unit="st" />
                </div>
                <ResultBox label={t.labels.freq} value={targetFreq} unit="Hz" />
            </CalcSection>
        </>
    );
};

const TimeCalculator = ({ t }) => {
    const [bpm, setBpm] = useState(120);
    const msQuarter = (60000 / bpm);

    const [distance, setDistance] = useState(10);
    const [temp, setTemp] = useState(20);
    const speedOfSound = 331.3 + (0.606 * temp);
    const delayTime = ((distance / speedOfSound) * 1000).toFixed(2);

    return (
        <>
            <CalcSection title={t.sections.bpmDelay}>
                <InputGroup label={t.labels.tempo} value={bpm} onChange={setBpm} unit="BPM" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    <div className="p-3 border-4 border-black bg-white text-center hover:shadow-brutal-sm transition-all">
                        <div className="text-xs font-bold opacity-50 uppercase">1/4 {t.labels.note}</div>
                        <div className="font-mono font-bold text-lg">{msQuarter.toFixed(1)} ms</div>
                    </div>
                    <div className="p-3 border-4 border-black bg-white text-center hover:shadow-brutal-sm transition-all">
                        <div className="text-xs font-bold opacity-50 uppercase">1/8 {t.labels.note}</div>
                        <div className="font-mono font-bold text-lg">{(msQuarter / 2).toFixed(1)} ms</div>
                    </div>
                    <div className="p-3 border-4 border-black bg-white text-center hover:shadow-brutal-sm transition-all">
                        <div className="text-xs font-bold opacity-50 uppercase">1/16 {t.labels.note}</div>
                        <div className="font-mono font-bold text-lg">{(msQuarter / 4).toFixed(1)} ms</div>
                    </div>
                    <div className="p-3 border-4 border-black bg-white text-center hover:shadow-brutal-sm transition-all">
                        <div className="text-xs font-bold opacity-50 uppercase">1/2 {t.labels.note}</div>
                        <div className="font-mono font-bold text-lg">{(msQuarter * 2).toFixed(1)} ms</div>
                    </div>
                    <div className="p-3 border-4 border-black bg-white text-center hover:shadow-brutal-sm transition-all">
                        <div className="text-xs font-bold opacity-50 uppercase">Dotted 1/8</div>
                        <div className="font-mono font-bold text-lg">{(msQuarter * 0.75).toFixed(1)} ms</div>
                    </div>
                    <div className="p-3 border-4 border-black bg-white text-center hover:shadow-brutal-sm transition-all">
                        <div className="text-xs font-bold opacity-50 uppercase">Triplet 1/4</div>
                        <div className="font-mono font-bold text-lg">{(msQuarter * 0.6667).toFixed(1)} ms</div>
                    </div>
                </div>
            </CalcSection>

            <CalcSection title={t.sections.distTime}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label={t.labels.distance} value={distance} onChange={setDistance} unit="m" />
                    <InputGroup label={t.labels.temp} value={temp} onChange={setTemp} unit="°C" />
                </div>
                <ResultBox label={t.labels.delayNeeded} value={delayTime} unit="ms" />
            </CalcSection>
        </>
    );
};

const DigitalCalculator = ({ t }) => {
    const [sr, setSr] = useState(44100);
    const [bitDepth, setBitDepth] = useState(24);
    const [channels, setChannels] = useState(2);
    const [minutes, setMinutes] = useState(3);

    const sizeBytes = sr * (bitDepth / 8) * channels * (minutes * 60);
    const sizeMB = (sizeBytes / 1048576).toFixed(2);
    const sizeGB = (sizeBytes / 1073741824).toFixed(3);

    return (
        <CalcSection title={t.sections.fileSize}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase mb-2 opacity-70 tracking-wider">{t.labels.sampleRate}</label>
                    <div className="shadow-brutal-sm hover:shadow-brutal transition-shadow">
                        <select value={sr} onChange={(e) => setSr(Number(e.target.value))} className="w-full border-4 border-black p-3 font-mono text-base md:text-lg focus:outline-none focus:bg-brand-beige">
                            <option value="44100">44.1 kHz</option>
                            <option value="48000">48 kHz</option>
                            <option value="88200">88.2 kHz</option>
                            <option value="96000">96 kHz</option>
                            <option value="192000">192 kHz</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase mb-2 opacity-70 tracking-wider">{t.labels.bitDepth}</label>
                    <div className="shadow-brutal-sm hover:shadow-brutal transition-shadow">
                        <select value={bitDepth} onChange={(e) => setBitDepth(Number(e.target.value))} className="w-full border-4 border-black p-3 font-mono text-base md:text-lg focus:outline-none focus:bg-brand-beige">
                            <option value="16">16-bit</option>
                            <option value="24">24-bit</option>
                            <option value="32">32-bit Float</option>
                        </select>
                    </div>
                </div>
                <InputGroup label={t.labels.channels} value={channels} onChange={setChannels} unit="#" />
                <InputGroup label={t.labels.duration} value={minutes} onChange={setMinutes} unit="min" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <ResultBox label={t.labels.sizeMB} value={sizeMB} unit="MB" />
                <ResultBox label={t.labels.sizeGB} value={sizeGB} unit="GB" />
            </div>
        </CalcSection>
    );
};

const AcousticsCalculator = ({ t }) => {
    const [L, setL] = useState(5);
    const [W, setW] = useState(4);
    const [H, setH] = useState(3);
    const c = 343;

    const getModes = (dim) => {
        return [1, 2, 3].map(n => ((c / 2) * (n / dim)).toFixed(1));
    };

    const modesL = getModes(L);
    const modesW = getModes(W);
    const modesH = getModes(H);

    return (
        <CalcSection title={t.sections.roomModes}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputGroup label={t.labels.length} value={L} onChange={setL} unit="m" />
                <InputGroup label={t.labels.width} value={W} onChange={setW} unit="m" />
                <InputGroup label={t.labels.height} value={H} onChange={setH} unit="m" />
            </div>
            <div className="mt-6 space-y-4">
                <div className="grid grid-cols-4 gap-2 text-sm font-mono border-b-4 border-black pb-2">
                    <span className="font-bold">Dim</span>
                    <span>Mode 1</span>
                    <span>Mode 2</span>
                    <span>Mode 3</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm font-mono items-center">
                    <span className="font-bold bg-black text-white p-1 text-center">L</span>
                    {modesL.map((m, i) => <span key={i}>{m} Hz</span>)}
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm font-mono items-center">
                    <span className="font-bold bg-black text-white p-1 text-center">W</span>
                    {modesW.map((m, i) => <span key={i}>{m} Hz</span>)}
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm font-mono items-center">
                    <span className="font-bold bg-black text-white p-1 text-center">H</span>
                    {modesH.map((m, i) => <span key={i}>{m} Hz</span>)}
                </div>
            </div>
        </CalcSection>
    );
};

const SpeakersCalculator = ({ t }) => {
    const [dbRef, setDbRef] = useState(90);
    const [distRef, setDistRef] = useState(1);
    const [distTarget, setDistTarget] = useState(10);

    const splLoss = (20 * Math.log10(distTarget / distRef));
    const splTarget = (dbRef - splLoss).toFixed(1);

    return (
        <CalcSection title={t.sections.splDist}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label={t.labels.refSPL} value={dbRef} onChange={setDbRef} unit="dB" />
                <InputGroup label={t.labels.refDist} value={distRef} onChange={setDistRef} unit="m" />
            </div>
            <div className="mt-6">
                <InputGroup label={t.labels.targetDist} value={distTarget} onChange={setDistTarget} unit="m" />
            </div>
            <ResultBox label={t.labels.splTarget} value={splTarget} unit="dB" />
            <p className="text-xs opacity-60 mt-2 font-mono">{t.notes.spl}</p>
        </CalcSection>
    );
};

const MicsCalculator = ({ t }) => {
    const [lowFreq, setLowFreq] = useState(100);
    const wavelength = 343 / lowFreq;
    const spacing = (30 * (wavelength / 2)).toFixed(1);

    return (
        <CalcSection title={t.sections.stereoSpacing}>
            <InputGroup label={t.labels.lowFreq} value={lowFreq} onChange={setLowFreq} unit="Hz" />
            <ResultBox label={t.labels.spacing} value={spacing} unit="cm" />
            <p className="text-xs opacity-60 mt-2 font-mono">{t.notes.stereo}</p>
        </CalcSection>
    );
};

const EQCalculator = ({ t }) => {
    const [q, setQ] = useState(1.41);
    const [fc, setFc] = useState(1000);

    const bwOct = (2 * Math.asinh(1 / (2 * q)) / Math.log(2)).toFixed(2);
    const bwHz = (fc / q).toFixed(1);

    return (
        <CalcSection title={t.sections.qConv}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label={t.labels.qFactor} value={q} onChange={setQ} unit="" />
                <InputGroup label={t.labels.centerFreq} value={fc} onChange={setFc} unit="Hz" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <ResultBox label={t.labels.bandwidth} value={bwOct} unit="oct" />
                <ResultBox label={t.labels.bandwidth} value={bwHz} unit="Hz" />
            </div>
        </CalcSection>
    );
};

const DynamicsCalculator = ({ t }) => {
    const [attack, setAttack] = useState(10);
    const freq = (1 / (2 * Math.PI * (attack / 1000))).toFixed(1);

    return (
        <CalcSection title={t.sections.compAttack}>
            <InputGroup label={t.labels.attack} value={attack} onChange={setAttack} unit="ms" />
            <ResultBox label={t.labels.transientFreq} value={freq} unit="Hz" />
            <p className="text-xs opacity-60 mt-2 font-mono">{t.notes.comp}</p>
        </CalcSection>
    );
};

const ElectricalCalculator = ({ t }) => {
    const [volts, setVolts] = useState(120);
    const [amps, setAmps] = useState(5);
    const watts = (volts * amps).toFixed(1);
    const ohms = (volts / amps).toFixed(1);

    return (
        <CalcSection title={t.sections.ohmsLaw}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label={t.labels.volts} value={volts} onChange={setVolts} unit="V" />
                <InputGroup label={t.labels.current} value={amps} onChange={setAmps} unit="A" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <ResultBox label={t.labels.watts} value={watts} unit="W" />
                <ResultBox label={t.labels.ohms} value={ohms} unit="Ω" />
            </div>
        </CalcSection>
    );
};

export default AudioCalculator;
