# Get the Mux Player Code

A component to show the code used to run Mux Player. Intended for easier on-boarding for new Mux users.

## Usage

| Param              | Type                                                               | Description                                                                                                          |
| ------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `params`           | json string                                                        | Key/value of the Player parameter and its value                                                                      |
| `player-id`        | string                                                             | ID being used in the Mux Player. Will copy parameters from this Mux Player instance to show code used to display it. |
| `show-copy-button` | A button to copy code. Show the default copy button, or the slot.  |
| `show-code`        | boolean                                                            | Show what code is to be copied, and a click-to-copy interactivity                                                    |
| `show-copy-button` | Display the default copy button or the button taken from the slot. |
| `button-title`     | string                                                             | The text to put in the button, or in the header of the code display                                                  |
| `docs`             | boolean                                                            | Show a link to the docs for more information about Mux Player                                                        |

## Get

| Param          | Type    | Description                                        |
| -------------- | ------- | -------------------------------------------------- |
| hasToken       | boolean | If video is signed.                                |
| expirationTime | string  | String of how much time is left on a signed token. |

## Slots

### `copy-code-button`

To show a single button to copy the code with, add the code below with your own classes for styling.

```html
<mux-player-code ....>
  <button slot="copy-code-button">Copy Mux Player Code</button>
</mux-player-code>
```

## Events

| Event Name | Description                           |
| ---------- | ------------------------------------- |
| `copied`   | When code is copied to the clipboard. |

```javascript
document
  .querySelector('player-code')
  .addEventListener('copied', (event) =>
    console.log('Fired Event Listener Copied ', event)
  );
```

```html
<mux-player-code
  params='{ "playback-id":"1234", "stream-type":"on-demand" }'
  copy-button="true"
  show-code="true"
  button-title="Copy Player Code NOW"
  docs="true"
></mux-player-code>
```

Or pulling from Mux Player directly:

```html
<mux-player
  id="myPlayer"
  playback-id="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
  stream-type="on-demand"
  title="My Demo Vid"
></mux-player>

<mux-player-code
  player-id="myPlayer"
  copy-button="true"
  show-code="true"
  button-title="Copy Player Code NOW"
  docs="true"
></mux-player-code>
```
