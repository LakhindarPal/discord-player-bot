# Commands Reference

A comprehensive, structured reference guide for all Deejay slash commands.

---

## Table of Contents

- [Music Commands](#music-commands) (37)
- [General & Utility Commands](#general-utility-commands) (5)
- [Developer Commands](#developer-commands) (1)

---

## Music Commands

Commands for controlling audio playback, managing queues, applying filters, and inspecting tracks.

| Command                                  | Usage                                                | Description                                     | Voice | Queue |
| :--------------------------------------- | :--------------------------------------------------- | :---------------------------------------------- | :---: | :---: |
| [`/clear`](#clear)                       | `/clear`                                             | Clear tracks from the queue or history.         |  Yes  |  Yes  |
| [`/connect`](#connect)                   | `/connect`                                           | Connect me to your voice channel.               |  No   |  No   |
| [`/disconnect`](#disconnect)             | `/disconnect`                                        | Disconnect me from the voice channel.           |  Yes  |  No   |
| [`/filters`](#filters)                   | `/filters`                                           | Configure and toggle audio filters.             |  Yes  |  Yes  |
| [`/jump`](#jump)                         | `/jump <position>`                                   | Jump to a track, keeping all preceding tracks.  |  Yes  |  Yes  |
| [`/lyrics`](#lyrics)                     | `/lyrics [query]`                                    | Find lyrics for current or searched track.      |  No   |  No   |
| [`/move`](#move)                         | `/move <from> <to>`                                  | Move a track to a new queue position.           |  Yes  |  Yes  |
| [`/next`](#next)                         | `/next`                                              | Skip to the next track.                         |  Yes  |  Yes  |
| [`/np`](#np)                             | `/np`                                                | View the currently playing track.               |  No   |  Yes  |
| [`/pause`](#pause)                       | `/pause`                                             | Pause the playback.                             |  Yes  |  Yes  |
| [`/play`](#play)                         | `/play <query>`                                      | Play a song or playlist from query or URL.      |  No   |  No   |
| [`/previous`](#previous)                 | `/previous`                                          | Skip to the previous track.                     |  Yes  |  Yes  |
| [`/remove absent`](#remove-absent)       | `/remove absent [start] [end]`                       | Remove tracks requested by absent users.        |  Yes  |  Yes  |
| [`/remove artist`](#remove-artist)       | `/remove artist <name> [start] [end]`                | Remove all tracks by an artist name.            |  Yes  |  Yes  |
| [`/remove duplicate`](#remove-duplicate) | `/remove duplicate [start] [end]`                    | Remove all duplicate tracks.                    |  Yes  |  Yes  |
| [`/remove duration`](#remove-duration)   | `/remove duration <duration> <filter> [start] [end]` | Remove tracks based on duration comparison.     |  Yes  |  Yes  |
| [`/remove last`](#remove-last)           | `/remove last [count]`                               | Remove the most recently added track.           |  Yes  |  Yes  |
| [`/remove match`](#remove-match)         | `/remove match <query>`                              | Search and select specific tracks to remove.    |  Yes  |  Yes  |
| [`/remove track`](#remove-track)         | `/remove track <position>`                           | Remove a track by its queue position.           |  Yes  |  Yes  |
| [`/remove user`](#remove-user)           | `/remove user <user> [start] [end]`                  | Remove all tracks queued by a specific user.    |  Yes  |  Yes  |
| [`/repeat`](#repeat)                     | `/repeat`                                            | Configure or view the repeat mode.              |  Yes  |  Yes  |
| [`/replay`](#replay)                     | `/replay`                                            | Replay the current track from beginning.        |  Yes  |  Yes  |
| [`/resume`](#resume)                     | `/resume`                                            | Resume the playback.                            |  Yes  |  Yes  |
| [`/seek`](#seek)                         | `/seek <timestamp>`                                  | Seek to a timestamp in current track.           |  Yes  |  Yes  |
| [`/shuffle`](#shuffle)                   | `/shuffle`                                           | Toggle queue shuffle mode.                      |  Yes  |  Yes  |
| [`/skipto`](#skipto)                     | `/skipto <position>`                                 | Skip to a track, removing all preceding tracks. |  Yes  |  Yes  |
| [`/songs`](#songs)                       | `/songs`                                             | Browse playback queue or history tracks.        |  Yes  |  Yes  |
| [`/sortby artist`](#sortby-artist)       | `/sortby artist <order> [start] [end]`               | Sort queue alphabetically by artist name.       |  Yes  |  Yes  |
| [`/sortby duration`](#sortby-duration)   | `/sortby duration <order> [start] [end]`             | Sort queue by duration (shortest or longest).   |  Yes  |  Yes  |
| [`/sortby fairly`](#sortby-fairly)       | `/sortby fairly [start] [end]`                       | Round-robin queue tracks fairly across users.   |  Yes  |  Yes  |
| [`/sortby name`](#sortby-name)           | `/sortby name <order> [start] [end]`                 | Sort queue alphabetically by track title.       |  Yes  |  Yes  |
| [`/sortby random`](#sortby-random)       | `/sortby random [start] [end]`                       | Randomly reorder the queue tracks.              |  Yes  |  Yes  |
| [`/sortby reverse`](#sortby-reverse)     | `/sortby reverse [start] [end]`                      | Reverse the queue track order.                  |  Yes  |  Yes  |
| [`/sortby user`](#sortby-user)           | `/sortby user [start] [end]`                         | Group queue tracks by requesting user.          |  Yes  |  Yes  |
| [`/stop`](#stop)                         | `/stop`                                              | Stop the playback.                              |  Yes  |  Yes  |
| [`/swap`](#swap)                         | `/swap <first> <second>`                             | Swap positions of two tracks in the queue.      |  Yes  |  Yes  |
| [`/volume`](#volume)                     | `/volume [level]`                                    | Set the playback volume.                        |  Yes  |  Yes  |

### `/clear`<a id="clear"></a>

**Description**  
Clear tracks from the queue or history.

**Usage**  
`/clear`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/connect`<a id="connect"></a>

**Description**  
Connect me to your voice channel.

**Usage**  
`/connect`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/disconnect`<a id="disconnect"></a>

**Description**  
Disconnect me from the voice channel.

**Usage**  
`/disconnect`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/filters`<a id="filters"></a>

**Description**  
Configure and toggle audio filters.

**Usage**  
`/filters`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/jump`<a id="jump"></a>

**Description**  
Jump to a track, keeping all preceding tracks.

**Usage**  
`/jump <position>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument   |   Type    | Required | Description                           | Choices / Constraints |
| :--------- | :-------: | :------: | :------------------------------------ | :-------------------- |
| `position` | `Integer` | **Yes**  | Track queue position (1-based index). | —                     |

[Back to top](#table-of-contents)

---

### `/lyrics`<a id="lyrics"></a>

**Description**  
Find lyrics for current or searched track.

**Usage**  
`/lyrics [query]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

**Arguments**

| Argument |   Type   | Required | Description                              | Choices / Constraints |
| :------- | :------: | :------: | :--------------------------------------- | :-------------------- |
| `query`  | `String` |    No    | Track title (defaults to current track). | —                     |

[Back to top](#table-of-contents)

---

### `/move`<a id="move"></a>

**Description**  
Move a track to a new queue position.

**Usage**  
`/move <from> <to>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                             | Choices / Constraints |
| :------- | :-------: | :------: | :-------------------------------------- | :-------------------- |
| `from`   | `Integer` | **Yes**  | Current queue position (1-based index). | Min: 1                |
| `to`     | `Integer` | **Yes**  | Target queue position (1-based index).  | Min: 1                |

[Back to top](#table-of-contents)

---

### `/next`<a id="next"></a>

**Description**  
Skip to the next track.

**Usage**  
`/next`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/np`<a id="np"></a>

**Description**  
View the currently playing track.

**Usage**  
`/np`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Not Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/pause`<a id="pause"></a>

**Description**  
Pause the playback.

**Usage**  
`/pause`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/play`<a id="play"></a>

**Description**  
Play a song or playlist from query or URL.

**Usage**  
`/play <query>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

**Arguments**

| Argument |   Type   | Required | Description                    | Choices / Constraints |
| :------- | :------: | :------: | :----------------------------- | :-------------------- |
| `query`  | `String` | **Yes**  | Track title, keywords, or URL. | —                     |

[Back to top](#table-of-contents)

---

### `/previous`<a id="previous"></a>

**Description**  
Skip to the previous track.

**Usage**  
`/previous`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/remove absent`<a id="remove-absent"></a>

**Description**  
Remove tracks requested by absent users.

**Usage**  
`/remove absent [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/remove artist`<a id="remove-artist"></a>

**Description**  
Remove all tracks by an artist name.

**Usage**  
`/remove artist <name> [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `name`   | `String`  | **Yes**  | Artist name to match.                  | —                     |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/remove duplicate`<a id="remove-duplicate"></a>

**Description**  
Remove all duplicate tracks.

**Usage**  
`/remove duplicate [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/remove duration`<a id="remove-duration"></a>

**Description**  
Remove tracks based on duration comparison.

**Usage**  
`/remove duration <duration> <filter> [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument   |   Type    | Required | Description                            | Choices / Constraints                                 |
| :--------- | :-------: | :------: | :------------------------------------- | :---------------------------------------------------- |
| `duration` | `String`  | **Yes**  | Duration timestamp (mm:ss).            | —                                                     |
| `filter`   | `String`  | **Yes**  | Duration comparison filter.            | `Longer than (>)`, `Shorter than (<)`, `Equal to (=)` |
| `start`    | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                                                |
| `end`      | `Integer` |    No    | End queue position (defaults to last). | Min: 1                                                |

[Back to top](#table-of-contents)

---

### `/remove last`<a id="remove-last"></a>

**Description**  
Remove the most recently added track.

**Usage**  
`/remove last [count]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                 | Choices / Constraints |
| :------- | :-------: | :------: | :-------------------------- | :-------------------- |
| `count`  | `Integer` |    No    | Number of tracks to remove. | Min: 1                |

[Back to top](#table-of-contents)

---

### `/remove match`<a id="remove-match"></a>

**Description**  
Search and select specific tracks to remove.

**Usage**  
`/remove match <query>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type   | Required | Description                  | Choices / Constraints |
| :------- | :------: | :------: | :--------------------------- | :-------------------- |
| `query`  | `String` | **Yes**  | Keywords or title to search. | —                     |

[Back to top](#table-of-contents)

---

### `/remove track`<a id="remove-track"></a>

**Description**  
Remove a track by its queue position.

**Usage**  
`/remove track <position>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument   |   Type    | Required | Description                              | Choices / Constraints |
| :--------- | :-------: | :------: | :--------------------------------------- | :-------------------- |
| `position` | `Integer` | **Yes**  | Track position in queue (1-based index). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/remove user`<a id="remove-user"></a>

**Description**  
Remove all tracks queued by a specific user.

**Usage**  
`/remove user <user> [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `user`   |  `User`   | **Yes**  | User whose tracks to remove.           | —                     |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/repeat`<a id="repeat"></a>

**Description**  
Configure or view the repeat mode.

**Usage**  
`/repeat`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/replay`<a id="replay"></a>

**Description**  
Replay the current track from beginning.

**Usage**  
`/replay`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/resume`<a id="resume"></a>

**Description**  
Resume the playback.

**Usage**  
`/resume`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/seek`<a id="seek"></a>

**Description**  
Seek to a timestamp in current track.

**Usage**  
`/seek <timestamp>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument    |   Type   | Required | Description                           | Choices / Constraints |
| :---------- | :------: | :------: | :------------------------------------ | :-------------------- |
| `timestamp` | `String` | **Yes**  | Timestamp as mm:ss (e.g. 1:30 or 45). | —                     |

[Back to top](#table-of-contents)

---

### `/shuffle`<a id="shuffle"></a>

**Description**  
Toggle queue shuffle mode.

**Usage**  
`/shuffle`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/skipto`<a id="skipto"></a>

**Description**  
Skip to a track, removing all preceding tracks.

**Usage**  
`/skipto <position>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument   |   Type    | Required | Description                           | Choices / Constraints |
| :--------- | :-------: | :------: | :------------------------------------ | :-------------------- |
| `position` | `Integer` | **Yes**  | Track queue position (1-based index). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/songs`<a id="songs"></a>

**Description**  
Browse playback queue or history tracks.

**Usage**  
`/songs`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/sortby artist`<a id="sortby-artist"></a>

**Description**  
Sort queue alphabetically by artist name.

**Usage**  
`/sortby artist <order> [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints                       |
| :------- | :-------: | :------: | :------------------------------------- | :------------------------------------------ |
| `order`  | `String`  | **Yes**  | Alphabetical sort order.               | `A to Z (Ascending)`, `Z to A (Descending)` |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                                      |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                                      |

[Back to top](#table-of-contents)

---

### `/sortby duration`<a id="sortby-duration"></a>

**Description**  
Sort queue by duration (shortest or longest).

**Usage**  
`/sortby duration <order> [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints             |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------------------- |
| `order`  | `String`  | **Yes**  | Duration sort order.                   | `Shortest first`, `Longest first` |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                            |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                            |

[Back to top](#table-of-contents)

---

### `/sortby fairly`<a id="sortby-fairly"></a>

**Description**  
Round-robin queue tracks fairly across users.

**Usage**  
`/sortby fairly [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/sortby name`<a id="sortby-name"></a>

**Description**  
Sort queue alphabetically by track title.

**Usage**  
`/sortby name <order> [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints                       |
| :------- | :-------: | :------: | :------------------------------------- | :------------------------------------------ |
| `order`  | `String`  | **Yes**  | Alphabetical sort order.               | `A to Z (Ascending)`, `Z to A (Descending)` |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                                      |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                                      |

[Back to top](#table-of-contents)

---

### `/sortby random`<a id="sortby-random"></a>

**Description**  
Randomly reorder the queue tracks.

**Usage**  
`/sortby random [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/sortby reverse`<a id="sortby-reverse"></a>

**Description**  
Reverse the queue track order.

**Usage**  
`/sortby reverse [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/sortby user`<a id="sortby-user"></a>

**Description**  
Group queue tracks by requesting user.

**Usage**  
`/sortby user [start] [end]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `start`  | `Integer` |    No    | Start queue position (defaults to 1).  | Min: 1                |
| `end`    | `Integer` |    No    | End queue position (defaults to last). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/stop`<a id="stop"></a>

**Description**  
Stop the playback.

**Usage**  
`/stop`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/swap`<a id="swap"></a>

**Description**  
Swap positions of two tracks in the queue.

**Usage**  
`/swap <first> <second>`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description                            | Choices / Constraints |
| :------- | :-------: | :------: | :------------------------------------- | :-------------------- |
| `first`  | `Integer` | **Yes**  | First track position (1-based index).  | Min: 1                |
| `second` | `Integer` | **Yes**  | Second track position (1-based index). | Min: 1                |

[Back to top](#table-of-contents)

---

### `/volume`<a id="volume"></a>

**Description**  
Set the playback volume.

**Usage**  
`/volume [level]`

**Specifications**

- **Category**: `music`
- **Voice Channel**: Required
- **Active Queue**: Required
- **Developer Only**: No

**Arguments**

| Argument |   Type    | Required | Description           | Choices / Constraints |
| :------- | :-------: | :------: | :-------------------- | :-------------------- |
| `level`  | `Integer` |    No    | Volume level (0-100). | Min: 0, Max: 100      |

[Back to top](#table-of-contents)

---

## General & Utility Commands

General utility commands for bot information, server help, latency diagnostics, and uptime.

| Command              | Usage     | Description                         | Voice | Queue |
| :------------------- | :-------- | :---------------------------------- | :---: | :---: |
| [`/help`](#help)     | `/help`   | Need help? Join our support server. |  No   |  No   |
| [`/info`](#info)     | `/info`   | Get some information about me.      |  No   |  No   |
| [`/invite`](#invite) | `/invite` | Invite me to your server.           |  No   |  No   |
| [`/ping`](#ping)     | `/ping`   | Ping? Pong!                         |  No   |  No   |
| [`/uptime`](#uptime) | `/uptime` | I have been online...               |  No   |  No   |

### `/help`<a id="help"></a>

**Description**  
Need help? Join our support server.

**Usage**  
`/help`

**Specifications**

- **Category**: `misc`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/info`<a id="info"></a>

**Description**  
Get some information about me.

**Usage**  
`/info`

**Specifications**

- **Category**: `misc`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/invite`<a id="invite"></a>

**Description**  
Invite me to your server.

**Usage**  
`/invite`

**Specifications**

- **Category**: `misc`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/ping`<a id="ping"></a>

**Description**  
Ping? Pong!

**Usage**  
`/ping`

**Specifications**

- **Category**: `misc`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

### `/uptime`<a id="uptime"></a>

**Description**  
I have been online...

**Usage**  
`/uptime`

**Specifications**

- **Category**: `misc`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: No

[Back to top](#table-of-contents)

---

## Developer Commands

Internal debugging, maintenance, and administrative evaluation utilities.

| Command          | Usage          | Description                     | Voice | Queue |
| :--------------- | :------------- | :------------------------------ | :---: | :---: |
| [`/eval`](#eval) | `/eval <code>` | Execute a JavaScript expression |  No   |  No   |

### `/eval`<a id="eval"></a>

**Description**  
Execute a JavaScript expression

**Usage**  
`/eval <code>`

**Specifications**

- **Category**: `dev`
- **Voice Channel**: Not Required
- **Active Queue**: Not Required
- **Developer Only**: Yes

**Arguments**

| Argument |   Type   | Required | Description                   | Choices / Constraints |
| :------- | :------: | :------: | :---------------------------- | :-------------------- |
| `code`   | `String` | **Yes**  | The piece of JavaScript code. | —                     |

[Back to top](#table-of-contents)

---
