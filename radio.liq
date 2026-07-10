# 1. Define the sources
youversion_bible = playlist(mode="randomize", reload=1, reload_mode="rounds", "/music/bible/youversion")
alex_bible = playlist(mode="randomize", reload=1, reload_mode="rounds", "/music/bible/alexander_scourby")
plain_bible = playlist(mode="randomize", reload=1, reload_mode="rounds", "/music/bible/default")

# 2. Make them safe
youversion_radio = mksafe(youversion_bible)
alex_radio = mksafe(alex_bible)
plain_radio = mksafe(plain_bible)

# 3. Output to Icecast (Ensure the 'radio' variable matches the source!)
output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "youversion",
  name = "YouVersion Bible Radio",
  youversion_radio)

output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "alex",
  name = "Alexander Scourby Bible Radio",
  alex_radio)

output.icecast(%mp3(bitrate=128),
  host = "icecast", port = 8000,
  password = "youshallnotpass", mount = "plain",
  name = "Plain Bible Radio",
  plain_radio)