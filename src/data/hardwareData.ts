import { PlatformInfo, MobileDeviceInfo, HeadphoneInfo } from '../types';

export const PLATFORMS: PlatformInfo[] = [
  {
    id: 'windows11',
    name: 'Windows 11',
    osName: 'Microsoft Windows 11 (23H2 / 24H2)',
    category: 'desktop',
    icon: 'Monitor',
    bluetoothArchNote:
      'Windows 11 combines A2DP (Stereo audio) and HFP (Hands-free mic) into a single audio endpoint. When Discord requests the Bluetooth mic, Windows forcibly collapses all system sound to 16kHz mono telephone quality.',
    discordFixSteps: [
      'Set Discord Voice Settings > Output Device: Your Bluetooth Headphone (Stereo).',
      'Set Discord Voice Settings > Input Device: Separate Mic (Laptop Realtek Mic, USB Webcam, or dedicated mic) NEVER the Bluetooth Hands-Free mic.',
      'Turn Off Discord "Attenuation" (set to 0%) so incoming game/stream audio is not lowered by 70% when you or others speak.',
      'Enable Krisp Noise Suppression on high background noise, or Standard with -55dB input sensitivity.'
    ],
    osAudioFixSteps: [
      'Win+R -> type "control mmsys.cpl sounds" -> Press Enter.',
      'Go to Recording tab -> Right-click Bluetooth "Hands-free AG Audio" -> Select Disable (this prevents Windows from ever triggering the 8kHz telephone mode).',
      'Ensure your Realtek / Array / External Mic is set as "Default Device" and "Default Communication Device".'
    ]
  },
  {
    id: 'macos',
    name: 'macOS',
    osName: 'Apple macOS (Sonoma / Sequoia)',
    category: 'desktop',
    icon: 'Laptop',
    bluetoothArchNote:
      'macOS switches the Bluetooth sample rate from 44.1kHz AAC stereo to 16kHz SCO/mSBC whenever CoreAudio detects an active recording stream from the Bluetooth device.',
    discordFixSteps: [
      'Discord Settings > Voice & Video > Input Device: Select "MacBook Pro Microphone" or external USB mic.',
      'Discord Settings > Voice & Video > Output Device: Select your Bluetooth Headphones.',
      'Discord Settings > Voice Processing: Set Echo Cancellation to ON, Noise Suppression to Krisp.',
      'Disable Discord Attenuation slider to 0% to prevent volume ducking during active chat.'
    ],
    osAudioFixSteps: [
      'Open System Settings > Sound > Input: Click "MacBook Microphone" (do NOT leave on AirPods / BT Mic).',
      'Open System Settings > Sound > Output: Click your Bluetooth Headphones.',
      'In Audio MIDI Setup utility (Cmd+Space -> "Audio MIDI Setup"), check headphone output format stays locked to 2ch 32-bit 48.0 kHz.'
    ]
  },
  {
    id: 'ios',
    name: 'iOS (iPhone)',
    osName: 'Apple iOS 17 / iOS 18',
    category: 'mobile',
    icon: 'Smartphone',
    bluetoothArchNote:
      'iOS aggressively routes both call input and output through Bluetooth by default. However, iOS Voice Isolation and Discord iOS audio subsystem can prioritize mic input while keeping music streams stable if configured properly.',
    discordFixSteps: [
      'In Discord Mobile App: User Profile -> Voice -> Audio Mode: Set to "Call Mode" or "Standard Mode" based on preference.',
      'Enable "Noise Suppression" (Krisp) inside Discord mobile voice settings.',
      'Enable "Echo Cancellation" and set Input Sensitivity to Automatic.',
      'Swipe down Control Center during an active Discord call -> Tap "Mic Mode" at the top -> Select "Voice Isolation" (eliminates ambient noise drastically).'
    ],
    osAudioFixSteps: [
      'Settings -> Bluetooth -> Tap (i) next to headphones -> Ensure Device Type is set to "Headphone".',
      'If using wired or dual connection, verify Control Center AirPlay icon directs voice output to headphones.'
    ]
  },
  {
    id: 'android',
    name: 'Android',
    osName: 'Google Android 14 / 15 (One UI, Pixel UI, Moto)',
    category: 'mobile',
    icon: 'Smartphone',
    bluetoothArchNote:
      'Android uses Telecom Manager for VoIP apps. When Discord enters an in-call state, Android may switch the Bluetooth profile to SCO (Synchronous Connection Oriented), compressing media streams.',
    discordFixSteps: [
      'In Discord Mobile App: Settings -> Voice -> Open "Advanced Voice Settings".',
      'Set Audio Output to "Communication" or "Call" rather than "Media" to prevent abrupt volume cuts.',
      'Toggle ON Krisp Noise Suppression to isolate voice from phone speaker bleed.',
      'Ensure "Force calls to use OpenSL ES" is enabled if experiencing audio stuttering on Samsung/Pixel.'
    ],
    osAudioFixSteps: [
      'Settings -> Bluetooth -> Gear icon next to your headphones: Toggle "Calls" ON, but if using phone mic, keep audio stream prioritized.',
      'Developer Options: Ensure "Bluetooth Audio Sample Rate" is at 44.1kHz or 48.0kHz and "Disable Bluetooth A2DP hardware offload" is OFF.'
    ]
  }
];

export const TOP_MOBILE_PHONES_USA: MobileDeviceInfo[] = [
  {
    id: 'iphone-16-pro',
    name: 'Apple iPhone 16 / 16 Pro',
    platform: 'ios',
    brand: 'Apple',
    marketShareRankUSA: 1,
    micLocations: 'Bottom port, front earpiece, rear camera cluster (4-mic studio array).',
    recommendedDiscordSource: 'Apple Studio Mic Array (or AirPods with Voice Isolation enabled in Control Center)',
    gotchaNote: 'iOS Voice Isolation in Control Center must be toggled on during the call to prevent background audio bleed.'
  },
  {
    id: 'iphone-15',
    name: 'Apple iPhone 15 / 15 Pro',
    platform: 'ios',
    brand: 'Apple',
    marketShareRankUSA: 2,
    micLocations: 'Bottom edge, earpiece receiver grille, back camera lens frame.',
    recommendedDiscordSource: 'Phone internal mic with Voice Isolation active, or AirPods Pro 2',
    gotchaNote: 'USB-C dongle adapters can introduce ground hum if charging simultaneously while on Discord.'
  },
  {
    id: 'iphone-14',
    name: 'Apple iPhone 14 / 14 Plus',
    platform: 'ios',
    brand: 'Apple',
    marketShareRankUSA: 3,
    micLocations: 'Triple mic array (bottom edge left, front ear slit, rear camera).',
    recommendedDiscordSource: 'Built-in microphone or paired MFi wireless headset',
    gotchaNote: 'If you hold the phone in landscape while gaming on Discord, palm covers bottom microphone.'
  },
  {
    id: 'iphone-13',
    name: 'Apple iPhone 13',
    platform: 'ios',
    brand: 'Apple',
    marketShareRankUSA: 4,
    micLocations: 'Dual bottom grills and camera microphone.',
    recommendedDiscordSource: 'Built-in microphone with iOS Voice Isolation',
    gotchaNote: 'Ensure Phone Noise Cancellation is enabled in iOS Accessibility > Audio/Visual.'
  },
  {
    id: 'iphone-se-3',
    name: 'Apple iPhone SE (3rd Gen)',
    platform: 'ios',
    brand: 'Apple',
    marketShareRankUSA: 5,
    micLocations: 'Bottom Lightning port sides and top receiver.',
    recommendedDiscordSource: 'Phone bottom microphone',
    gotchaNote: 'Lower sensitivity when phone rests flat on desk; elevate or angle toward mouth.'
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 / S24 Ultra',
    platform: 'android',
    brand: 'Samsung',
    marketShareRankUSA: 6,
    micLocations: 'Bottom port, top frame hole, rear camera module (Directional beamforming).',
    recommendedDiscordSource: 'Galaxy Beamforming Mic with Samsung Voice Focus mode',
    gotchaNote: 'One UI "Separate app sound" must NOT intercept Discord output audio.'
  },
  {
    id: 'galaxy-s23',
    name: 'Samsung Galaxy S23 / S23 FE',
    platform: 'android',
    brand: 'Samsung',
    marketShareRankUSA: 7,
    micLocations: 'Bottom edge next to USB-C, top frame mic pinhole.',
    recommendedDiscordSource: 'Internal mic array or Galaxy Buds 2 Pro in 360 Audio off mode',
    gotchaNote: 'Dolby Atmos for Gaming can cause simulated surround reverb inside Discord voice channel.'
  },
  {
    id: 'galaxy-a54',
    name: 'Samsung Galaxy A54 5G',
    platform: 'android',
    brand: 'Samsung',
    marketShareRankUSA: 8,
    micLocations: 'Bottom pinhole, top noise reduction pinhole.',
    recommendedDiscordSource: 'Phone main microphone with Discord Krisp activated',
    gotchaNote: 'Aggressive battery optimization can put Discord background voice process to sleep.'
  },
  {
    id: 'pixel-9-pro',
    name: 'Google Pixel 9 / 9 Pro',
    platform: 'android',
    brand: 'Google',
    marketShareRankUSA: 9,
    micLocations: 'Bottom speaker slot, top antenna band mic, rear camera visor mic.',
    recommendedDiscordSource: 'Pixel Clear Calling hardware mic or Pixel Buds Pro',
    gotchaNote: 'Android "Clear Calling" setting under Sound & Vibration stacks with Discord Krisp.'
  },
  {
    id: 'pixel-8',
    name: 'Google Pixel 8 / 8a',
    platform: 'android',
    brand: 'Google',
    marketShareRankUSA: 10,
    micLocations: 'Bottom frame, top edge, camera bar audio zoom mic.',
    recommendedDiscordSource: 'Built-in microphone',
    gotchaNote: 'Pixel Spatial Audio should be turned off for Discord voice calls to prevent voice panning.'
  }
];

export const TOP_HEADPHONES_USA: HeadphoneInfo[] = [
  {
    id: 'airpods-pro-2',
    name: 'Apple AirPods Pro 2',
    brand: 'Apple',
    rank: 1,
    bluetoothVersion: 'Bluetooth 5.3 (H2 Chip)',
    hfpBehavior: 'Switches to AAC-ELD/mSBC in call. When competing stream audio plays, bit-rate drops to 16kHz mono on Windows/macOS unless input is redirected.',
    audioQualityDropSeverity: 'extreme',
    infallibleConfig: {
      recommendedOutput: 'AirPods Pro 2 (Stereo / A2DP)',
      recommendedInput: 'Computer built-in mic / External mic (NEVER AirPods Mic on Windows/PC)',
      actionableFix: 'Use AirPods for pristine high-res listening only; assign Laptop/Phone mic as Discord Input. On iOS, enable Control Center Voice Isolation.'
    }
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    rank: 2,
    bluetoothVersion: 'Bluetooth 5.2 (LDAC / AAC / SBC)',
    hfpBehavior: 'Multipoint connection and mic activation locks headphone into HFP mode. Music/game sounds become muffled like a walkie-talkie.',
    audioQualityDropSeverity: 'extreme',
    infallibleConfig: {
      recommendedOutput: 'WH-1000XM5 Stereo',
      recommendedInput: 'Laptop Realtek/MacBook Mic or USB Desk Mic',
      actionableFix: 'Disable "Handsfree Telephony" in Windows Device Manager. Turn OFF "Speak-to-Chat" in Sony Headphones Connect app so laughing or speaking doesn\'t mute your friends.'
    }
  },
  {
    id: 'airpods-max',
    name: 'Apple AirPods Max',
    brand: 'Apple',
    rank: 3,
    bluetoothVersion: 'Bluetooth 5.0 (H1 Chip)',
    hfpBehavior: 'Engages bidirectional SCO channel. On Windows PC, incoming voice and background streams distort and crackle during simultaneous chatter.',
    audioQualityDropSeverity: 'extreme',
    infallibleConfig: {
      recommendedOutput: 'AirPods Max',
      recommendedInput: 'Separate Dedicated / Webcam Mic',
      actionableFix: 'On Mac, keep input set to internal Mac mic. On Windows, use Lightning-to-3.5mm bi-directional cable or separate USB mic to avoid HFP collapse.'
    }
  },
  {
    id: 'bose-qc-ultra',
    name: 'Bose QuietComfort Ultra',
    brand: 'Bose',
    rank: 4,
    bluetoothVersion: 'Bluetooth 5.3 (Snapdragon Sound / aptX Adaptive)',
    hfpBehavior: 'Bose hands-free profile severely compresses dynamic range and introduces auto-ducking of background channels.',
    audioQualityDropSeverity: 'high',
    infallibleConfig: {
      recommendedOutput: 'Bose QC Ultra Stereo',
      recommendedInput: 'Internal / External Microphone',
      actionableFix: 'In Bose Music app, set Self-Voice to Low or Off to stop ambient room feedback looping into your earcups while talking on Discord.'
    }
  },
  {
    id: 'sony-wh1000xm4',
    name: 'Sony WH-1000XM4',
    brand: 'Sony',
    rank: 5,
    bluetoothVersion: 'Bluetooth 5.0 (LDAC / AAC)',
    hfpBehavior: 'Windows lists two separate devices: "Stereo" and "Hands-Free AG Audio". Selecting Hands-Free for Discord output kills bass and highs.',
    audioQualityDropSeverity: 'extreme',
    infallibleConfig: {
      recommendedOutput: 'WH-1000XM4 Stereo',
      recommendedInput: 'Dedicated Desk/Laptop Mic',
      actionableFix: 'Windows Control Panel -> Sound -> Playback: Right-click "Hands-Free AG Audio" and click DISABLE. Keep only "WH-1000XM4 Stereo" enabled.'
    }
  },
  {
    id: 'beats-studio-pro',
    name: 'Beats Studio Pro',
    brand: 'Beats / Apple',
    rank: 6,
    bluetoothVersion: 'Bluetooth 5.3',
    hfpBehavior: 'USB-C Lossless audio mode supports full 24-bit/48kHz, but over pure Bluetooth wireless, mic activation drops output fidelity to mono 16kHz.',
    audioQualityDropSeverity: 'high',
    infallibleConfig: {
      recommendedOutput: 'Beats Studio Pro (Wireless Stereo or USB-C)',
      recommendedInput: 'Separate USB Mic or use Beats via wired USB-C Audio cable',
      actionableFix: 'Plugin via USB-C cable for native lossless audio + microphone simultaneously without Bluetooth bandwidth compression.'
    }
  },
  {
    id: 'bose-qc45',
    name: 'Bose QuietComfort 45 / SE',
    brand: 'Bose',
    rank: 7,
    bluetoothVersion: 'Bluetooth 5.1',
    hfpBehavior: 'Picks up high ambient keyboard clatter when internal mics activate, forcing Discord noise gate to aggressively stutter audio.',
    audioQualityDropSeverity: 'high',
    infallibleConfig: {
      recommendedOutput: 'Bose QC45 Stereo',
      recommendedInput: 'External USB Microphone / Laptop Mic',
      actionableFix: 'In Discord, switch Noise Suppression to Krisp, disable Echo Cancellation if using a separate cardioid mic to stop voice clipping.'
    }
  },
  {
    id: 'galaxy-buds-pro',
    name: 'Samsung Galaxy Buds 2 / 3 Pro',
    brand: 'Samsung',
    rank: 8,
    bluetoothVersion: 'Bluetooth 5.3 / 5.4 (SSC Codec)',
    hfpBehavior: 'On Samsung phones with SSC, call mode is passable; on Windows 11 PCs, it drops immediately to 8kHz telephone audio with heavy delay.',
    audioQualityDropSeverity: 'extreme',
    infallibleConfig: {
      recommendedOutput: 'Galaxy Buds Pro Stereo',
      recommendedInput: 'Phone built-in mic / PC USB Mic',
      actionableFix: 'On PC: Install Samsung Galaxy Buds app from Microsoft Store and ensure Game Mode is off. Keep PC mic as Discord input.'
    }
  },
  {
    id: 'pixel-buds-pro-2',
    name: 'Google Pixel Buds Pro / Pro 2',
    brand: 'Google',
    rank: 9,
    bluetoothVersion: 'Bluetooth 5.4 (Tensor A1 / Opus)',
    hfpBehavior: 'Wind-blocking mesh helps vocal clarity, but simultaneous media stream experiences ducking and pitch shifting on non-Pixel devices.',
    audioQualityDropSeverity: 'moderate',
    infallibleConfig: {
      recommendedOutput: 'Pixel Buds Pro Stereo',
      recommendedInput: 'Pixel phone mic or separate PC mic',
      actionableFix: 'Turn off "Volume EQ" in Pixel Buds settings to maintain consistent chat volume levels during intense gaming sounds.'
    }
  },
  {
    id: 'sennheiser-momentum-4',
    name: 'Sennheiser Momentum 4',
    brand: 'Sennheiser',
    rank: 10,
    bluetoothVersion: 'Bluetooth 5.2 (aptX Adaptive)',
    hfpBehavior: 'When mic triggers, audiophile sound signature turns flat and metallic. Sidetone activates automatically, amplifying room hum.',
    audioQualityDropSeverity: 'high',
    infallibleConfig: {
      recommendedOutput: 'Momentum 4 Stereo',
      recommendedInput: 'Separate mic or Sennheiser BTD 600 USB Dongle',
      actionableFix: 'Use Sennheiser BTD 600 aptX Adaptive dongle for low latency, or route input to internal mic.'
    }
  },
  {
    id: 'anker-soundcore-q30',
    name: 'Anker Soundcore Life Q30 / Space One',
    brand: 'Anker Soundcore',
    rank: 11,
    bluetoothVersion: 'Bluetooth 5.0 / 5.3 (LDAC)',
    hfpBehavior: 'Severe volume attenuation when mic opens. Any background YouTube or game audio is lowered by ~80% and heavily muffled.',
    audioQualityDropSeverity: 'extreme',
    infallibleConfig: {
      recommendedOutput: 'Soundcore Stereo',
      recommendedInput: 'Stand microphone / Laptop webcam mic',
      actionableFix: 'Never choose "Soundcore Hands-Free" as Discord input. Set Discord Output to Soundcore Stereo, Input to Laptop Microphone.'
    }
  },
  {
    id: 'jbl-tune-760nc',
    name: 'JBL Tune 760NC / 770NC',
    brand: 'JBL',
    rank: 12,
    bluetoothVersion: 'Bluetooth 5.0 / 5.3',
    hfpBehavior: 'Microphone capsule picks up heavy breathing and mouth pops; Discord noise suppression cuts syllables when background audio plays.',
    audioQualityDropSeverity: 'high',
    infallibleConfig: {
      recommendedOutput: 'JBL Stereo',
      recommendedInput: 'External Clip-on or Desk Mic',
      actionableFix: 'Set Discord Input Sensitivity manually to -52dB (uncheck Auto) so your voice is not chopped by JBL\'s limited mic dynamic range.'
    }
  },
  {
    id: 'shokz-openrun-pro',
    name: 'Shokz OpenRun Pro',
    brand: 'Shokz',
    rank: 13,
    bluetoothVersion: 'Bluetooth 5.1 (Bone Conduction)',
    hfpBehavior: 'Bone conduction transducers rattle on loud Discord bass/stream music while dual noise-canceling mic cuts out high speech frequencies.',
    audioQualityDropSeverity: 'moderate',
    infallibleConfig: {
      recommendedOutput: 'Shokz OpenRun Pro',
      recommendedInput: 'Shokz Loop110 USB Wireless Adapter or Internal Mic',
      actionableFix: 'Use Shokz USB PC dongle for stabilized telephony channel, or pair with desktop USB condenser microphone.'
    }
  },
  {
    id: 'jabra-elite-8',
    name: 'Jabra Elite 8 Active / Elite 7',
    brand: 'Jabra',
    rank: 14,
    bluetoothVersion: 'Bluetooth 5.3 (LE Audio Ready)',
    hfpBehavior: 'HearThrough mode automatically turns on in calls, feeding room noise into Discord if Discord Krisp is turned off.',
    audioQualityDropSeverity: 'moderate',
    infallibleConfig: {
      recommendedOutput: 'Jabra Elite Stereo',
      recommendedInput: 'Separate mic (or Jabra with Krisp ON)',
      actionableFix: 'Turn HearThrough to "Mute" in Sound+ app during calls; enable Krisp in Discord.'
    }
  },
  {
    id: 'marshall-major-iv',
    name: 'Marshall Major IV',
    brand: 'Marshall',
    rank: 15,
    bluetoothVersion: 'Bluetooth 5.0 (SBC)',
    hfpBehavior: 'Lacks multi-directional mic filtering; when listening to loud streams, speaker leakage re-enters mic causing acoustic feedback.',
    audioQualityDropSeverity: 'high',
    infallibleConfig: {
      recommendedOutput: 'Major IV Stereo',
      recommendedInput: 'Built-in Laptop or Phone mic',
      actionableFix: 'Turn on Discord Echo Cancellation and uncheck "Automatic Gain Control" to prevent volume surging.'
    }
  }
];

export const DISCORD_GOLDEN_RULES = [
  {
    id: 'rule-split-device',
    title: 'The "Split-Device" Golden Rule for Bluetooth',
    description:
      'Always set Output = Bluetooth Headphones (Stereo A2DP) and Input = Laptop/Phone internal mic or USB microphone. This prevents Bluetooth from downgrading your audio into the 8kHz/16kHz mSBC walkie-talkie mode.',
    importance: 'CRITICAL'
  },
  {
    id: 'rule-attenuation-zero',
    title: 'Set Discord Attenuation to 0%',
    description:
      'By default, Discord "Attenuation" ducks (mutes) games, Spotify, or streams by up to 70% whenever someone speaks. Set the slider to 0% and uncheck "When I speak" and "When others speak".',
    importance: 'HIGH'
  },
  {
    id: 'rule-krisp-vs-standard',
    title: 'Krisp Noise Suppression vs Standard',
    description:
      'Krisp uses deep neural networks to strip keyboard clicks and background music bleed. If your voice sounds robotic or cuts off quiet words, switch to "Standard" and manually adjust Input Sensitivity to -52dB.',
    importance: 'HIGH'
  },
  {
    id: 'rule-handsfree-telephony',
    title: 'Disable Windows Handsfree Telephony',
    description:
      'In Windows Control Panel > Sound > Recording, disable the "Hands-Free AG Audio" device. This permanently locks your headphones into high-res stereo mode so games and music never get destroyed.',
    importance: 'CRITICAL'
  },
  {
    id: 'rule-echo-cancellation',
    title: 'Echo Cancellation Configuration',
    description:
      'If using open-back headphones, earbuds with high volume, or speakers, Echo Cancellation prevents your mic from looping other users back to the channel.',
    importance: 'MEDIUM'
  }
];
