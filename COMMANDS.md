# Slash Commands List

## Music Commands

### `/volume`

Adjust the volume of the music player.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| level | The volume level to set (0-100). | false | Number | |

---

### `/swap`

Swap the position of two songs in the queue
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| first | The position of the first song | true | Number | |
| second | The position of the second song | true | Number | |

---

### `/stop`

Stop the playback.

---

### `/songs queue`

Display songs from the queue.

---

### `/songs history`

Display songs from the history.

---

### `/skipto`

Skip to the given song, removing others on the way
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| position | The position of the song to skip to | true | Number | |

---

### `/skip`

Skip to the next song

---

### `/shuffle`

Toggle shuffle mode for this queue.

---

### `/seek`

Seek the player to a specific timestamp.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| timestamp | The timestamp to seek to (mm:ss). | true | String | |

---

### `/resume`

Resume the playback

---

### `/replay`

Replay the current song from the beginning

---

### `/repeat status`

Show the current repeat mode.

---

### `/repeat off`

Disable repeat mode.

---

### `/repeat queue`

Repeat the entire queue.

---

### `/repeat song`

Repeat the current song.

---

### `/repeat autoplay`

Automatically play related songs based on your queue.

---

### `/remove`

Remove a song from the queue
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| position | The position of the song to remove | true | Number | |

---

### `/play`

Play a song or playlist from url or name
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| query | The name or url of the song, you want to play. | true | String | |
| source | The search engine you want to use. | false | String | YouTube, SoundCloud, Spotify, Apple Music |

---

### `/pause`

Pause the playback

---

### `/np`

Show the current playing song

---

### `/move`

Move a song in the queue
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| from | The current position of the song | true | Number | |
| to | The new position to move to | true | Number | |

---

### `/lyrics`

Get lyrics for a song.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| query | The title of the song to get lyrics for. | false | String | |

---

### `/leave`

Leave the voice channel.

---

### `/jump`

Jump to specific song on the queue without removing others
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| position | The position of the song to jump to | true | Number | |

---

### `/join`

Let the bot join your voice channel.

---

### `/clear queue`

Clear songs from the queue.

---

### `/clear history`

Clear songs from the history.

---

### `/clear all`

Clear all songs from the queue and history.

---

### `/back`

Go back to the previous song

---

## Misc Commands

### `/uptime`

Show how long the bot has been up

---

### `/ping`

Ping? Pong!

---

### `/invite`

Invite the bot to your server

---

### `/info`

Show info about the bot

---

### `/help`

Join the support server and get some help

---

## Filter Commands

### `/filters disable`

Disable all active FFmpeg audio filters.

---

### `/filters status`

Show the status of all FFmpeg audio filters.

---

### `/filters toggle`

Enable or disable an FFmpeg audio filter.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| name | The name of the filter to toggle. | true | String | 8D, Bassboost, Chorus, Dim, Earrape, Fadein, Flanger, Gate, Haas, Karaoke, Lofi, Mcompand, Mono, Nightcore, Normalizer, Phaser, Pulsator, Reverse, Softlimiter, Subboost, Surrounding, Treble, Tremolo, Vaporwave, Vibrato |

---

### `/equalizer disable`

Disable the equalizer filter.

---

### `/equalizer set`

Set an equalizer filter.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| preset | The name of the preset to apply. | true | String | Flat, Classical, Club, Dance, FullBass, FullBassTreble, FullTreble, Headphones, LargeHall, Live, Party, Pop, Reggae, Rock, Ska, Soft, SoftRock, Techno |

---

### `/biquad disable`

Disable the biquad filter.

---

### `/biquad set`

Apply a specific biquad audio filter.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| preset | The name of the preset to apply. | true | String | SinglePoleLowPassApprox, SinglePoleLowPass, LowPass, HighPass, BandPass, Notch, AllPass, LowShelf, HighShelf, PeakingEQ |

---

## Dev Commands

### `/eval`

Execute a piece of javascript code
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| code | The code to execute | true | String | |

---
