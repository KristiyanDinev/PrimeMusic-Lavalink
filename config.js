

try {
  require("dotenv").config();
} catch (_) {}

const parseBoolean = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;
  return fallback;
};

const parseNumber = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseList = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch (_) {}

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseNodes = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (_) {}

  return fallback;
};

const defaultNodes = [
  {
    name: "LocalNode",
    password: "youshallnotpass",
    host: "lavalink",
    port: 2333,
    secure: false,
  },
];


module.exports = {
  TOKEN: process.env.TOKEN || "",
  language: process.env.LANGUAGE || "en",
  ownerID: parseList(process.env.OWNER_IDS),
  mongodbUri: process.env.MONGODB_URI || "",
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID || "",
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  setupFilePath: process.env.SETUP_FILE_PATH || "./commands/setup.json",
  commandsDir: process.env.COMMANDS_DIR || "./commands",
  embedColor: process.env.EMBED_COLOR || "#1d96e1",
  customEmoji: parseBoolean(process.env.CUSTOM_EMOJI, false),
  emojiTheme: process.env.EMOJI_THEME || "redwhite",
  helpBannerUrl: process.env.HELP_BANNER_URL || "https://remnantofgod.org/assets/img/wtpr-main-new.png",
  activityName: process.env.ACTIVITY_NAME || "YouTube Music",
  activityType: process.env.ACTIVITY_TYPE || "LISTENING",
  SupportServer: process.env.SUPPORT_SERVER || "",
  embedTimeout: parseNumber(process.env.EMBED_TIMEOUT, 5),
  showProgressBar: parseBoolean(process.env.SHOW_PROGRESS_BAR, false),
  showVisualizer: parseBoolean(process.env.SHOW_VISUALIZER, false),
  generateSongCard: parseBoolean(process.env.GENERATE_SONG_CARD, true),
  metadataTag: parseBoolean(process.env.METADATA_TAG, true),
  lowMemoryMode: parseBoolean(process.env.LOW_MEMORY_MODE, true),
  errorLog: process.env.ERROR_LOG || "",
  nodes: parseNodes(process.env.NODES, defaultNodes),
};
