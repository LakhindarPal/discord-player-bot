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

Seek to a specific timestamp in the current track.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| timestamp | The timestamp to seek to (in seconds). | true | Number | |

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

### `/queue`

Show the songs in the queue.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| page | The page number of the queue | false | Number | |

---

### `/play`

Play a song or playlist from url or name
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| query | The name or url of the song, you want to play. | true | String | |

---

### `/pause`

Pause the playback

---

### `/now`

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

### `/jump`

Jump to specific song on the queue without removing others
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| position | The position of the song to jump to | true | Number | |

---

### `/filters clear`

Remove all applied audio filters.

---

### `/filters status`

Show the status of all audio filters.

---

### `/filters toggle`

Enable or disable a specific audio filter.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| name | The name of the filter to toggle. | true | String | Bassboost, Chorus, Compressor, Dim, Earrape, Expander, Fadein, Flanger, Gate, Haas, Karaoke, Lofi, Mcompand, Mono, Nightcore, Normalizer, Phaser, Pulsator, Reverse, Softlimiter, Subboost, Surrounding, Treble, Vaporwave, Vibrato |

---

### `/clear`

Clear songs from the queue, history, or all.
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| type | Select the type of songs to clear. | true | String | Queue, History, All |

---

### `/back`

Go back to the previous song

---

## Misc Commands

### `/uptime`

Show how long the bot has been up

---

### `/support`

Join the support server and get some help

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

## Dev Commands

### `/eval`

Execute a piece of javascript code
| Name | Description | Required | Type | Choices |
|------|-------------|----------|------|---------|
| code | The code to execute | true | String | |

---
