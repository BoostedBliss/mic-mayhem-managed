export type PlatformId = 'windows11' | 'macos' | 'ios' | 'android';

export interface PlatformInfo {
  id: PlatformId;
  name: string;
  osName: string;
  category: 'desktop' | 'mobile';
  icon: string;
  bluetoothArchNote: string;
  discordFixSteps: string[];
  osAudioFixSteps: string[];
}

export interface MobileDeviceInfo {
  id: string;
  name: string;
  platform: 'ios' | 'android';
  brand: string;
  marketShareRankUSA: number;
  micLocations: string;
  recommendedDiscordSource: string;
  gotchaNote: string;
}

export interface HeadphoneInfo {
  id: string;
  name: string;
  brand: string;
  rank: number;
  bluetoothVersion: string;
  hfpBehavior: string;
  audioQualityDropSeverity: 'extreme' | 'high' | 'moderate';
  infallibleConfig: {
    recommendedOutput: string;
    recommendedInput: string;
    actionableFix: string;
  };
}

export type CompetingSoundType = 'none' | 'discord_chatter' | 'stream_lofi' | 'gaming_rumble';

export interface MicAnalysisMetrics {
  currentDb: number;
  peakDb: number;
  noiseFloorDb: number;
  isClipping: boolean;
  isSpeaking: boolean;
  frequencyData: Uint8Array;
}
