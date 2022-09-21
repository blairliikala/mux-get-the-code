class GetPlayerCode extends HTMLElement {
  #isInit = false;
  #params = false;
  #playback = false;
  #copyButton = false;
  #showCode = false;
  #buttonTitle = false;
  #docs = false;

  playercode = '';
  divs = {
    'root' : {},
    'copyButton' : {},
    'moreInfo' : {}
  }

  #hasToken = false;
  #copyButtonListenerSet = false;
  #token = '';

  muxLogo = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDIgMzMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMiAzMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtvcGFjaXR5OjAuNztmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDF7ZmlsbDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qye29wYWNpdHk6MC43O2ZpbGw6dXJsKCNTVkdJRF8zXyk7fQoJLnN0M3tvcGFjaXR5OjAuNztmaWxsOnVybCgjU1ZHSURfNF8pO30KCS5zdDR7ZmlsbDp1cmwoI1NWR0lEXzVfKTt9Cgkuc3Q1e2ZpbGw6dXJsKCNTVkdJRF82Xyk7fQoJLnN0NntmaWxsOnVybCgjU1ZHSURfN18pO30KCS5zdDd7ZmlsbDp1cmwoI1NWR0lEXzhfKTt9Cgkuc3Q4e29wYWNpdHk6MC43O2ZpbGw6dXJsKCNTVkdJRF85Xyk7fQoJLnN0OXtmaWxsOnVybCgjU1ZHSURfMTBfKTt9Cgkuc3QxMHtmaWxsOnVybCgjU1ZHSURfMTFfKTt9Cjwvc3R5bGU+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTEiIHkxPSIxNi4zNTQ3IiB4Mj0iMTAxLjc1MTIiIHkyPSIxNi4zNTQ3Ij4KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjRFMDAiLz4KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjE3OTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTk1LjgsMzEuN2MxLjQsMS40LDMuNiwxLjQsNC45LDBjMS40LTEuNCwxLjQtMy42LDAtNC45TDc0LjksMWMtMS40LTEuNC0zLjYtMS40LTQuOSwwcy0xLjQsMy42LDAsNC45CglMOTUuOCwzMS43eiIvPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAuMjUiIHkxPSIxNi42NDUzIiB4Mj0iMTAxLjc1MTIiIHkyPSIxNi42NDUzIj4KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjRFMDAiLz4KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjE3OTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTc0LjksMzJjLTEuNCwxLjQtMy42LDEuNC00LjksMHMtMS40LTMuNiwwLTQuOUw5NS44LDEuM2MxLjQtMS40LDMuNi0xLjQsNC45LDBzMS40LDMuNiwwLDQuOUw3NC45LDMyeiIvPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzNfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIxMi44NjE1IiB5MT0iMTYuMzU0NyIgeDI9IjMxNi45MDYiIHkyPSIxNi4zNTQ3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDMxNyAwKSI+Cgk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY0RTAwIi8+Cgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkYxNzkxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01MSwyNS44YzQuNCwwLDgtMy42LDgtOFYzLjZjMC0yLDEuNS0zLjYsMy41LTMuNmMyLDAsMy41LDEuNiwzLjUsMy42djE0LjFjMCw4LjMtNi43LDE1LTE1LDE1CgljLTEuOSwwLTMuNS0xLjYtMy41LTMuNUM0Ny42LDI3LjMsNDkuMSwyNS44LDUxLDI1Ljh6Ii8+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTAuNzkzOSIgeTE9IjE2LjY0NTMiIHgyPSIxMDMuMjUwNiIgeTI9IjE2LjY0NTMiPgoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGNEUwMCIvPgoJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGMTc5MSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjkuNSwwLjNjLTIsMC0zLjUsMS42LTMuNSwzLjZ2MjUuNWMwLDIsMS41LDMuNiwzLjUsMy42czMuNS0xLjYsMy41LTMuNlYzLjlDMzMsMS45LDMxLjUsMC4zLDI5LjUsMC4zeiIvPgo8Zz4KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTguMzMzMzM0ZS0wMiIgeTE9IjMuNDc5NyIgeDI9IjEwMS44MzUiIHkyPSIzLjQ3OTciPgoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjRFMDAiLz4KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkYxNzkxIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPGNpcmNsZSBjbGFzcz0ic3Q0IiBjeD0iNjIuNSIgY3k9IjMuNSIgcj0iMy41Ii8+CjwvZz4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF82XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMi4wODQ1IiB5MT0iMjkuNTIwMyIgeDI9IjEwMS45NiIgeTI9IjI5LjUyMDMiPgoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGNEUwMCIvPgoJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGMTc5MSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8Y2lyY2xlIGNsYXNzPSJzdDUiIGN4PSI5OC41IiBjeT0iMjkuNSIgcj0iMy41Ii8+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfN18iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTEuMDQzOSIgeTE9IjE2LjY0NTMiIHgyPSIxMDMuMDAwNiIgeTI9IjE2LjY0NTMiPgoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGNEUwMCIvPgoJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGMTc5MSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNMy41LDAuM0MxLjUsMC4zLDAsMS45LDAsMy45djI1LjVjMCwyLDEuNSwzLjYsMy41LDMuNlM3LDMxLjQsNywyOS40VjMuOUM3LDEuOSw1LjUsMC4zLDMuNSwwLjN6Ii8+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfOF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTAuOTUiIHkxPSIyOS41IiB4Mj0iMTAzLjcwMDYiIHkyPSIyOS41Ij4KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjRFMDAiLz4KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjE3OTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNpcmNsZSBjbGFzcz0ic3Q3IiBjeD0iMjkuNSIgY3k9IjI5LjUiIHI9IjMuNSIvPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzlfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAuNSIgeTE9IjEwIiB4Mj0iMTAyLjgwMTYiIHkyPSIxMCI+Cgk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY0RTAwIi8+Cgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkYxNzkxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIGNsYXNzPSJzdDgiIGQ9Ik0xMy45LDE4LjljMS40LDEuNCwzLjYsMS40LDQuOSwwczEuNC0zLjYsMC00LjlMNS45LDEuMUM0LjYtMC4zLDIuNC0wLjMsMSwxLjFTLTAuMyw0LjcsMSw2TDEzLjksMTguOXoiLz4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xMF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMC4yNSIgeTE9IjEwIiB4Mj0iMTAwLjUwNSIgeTI9IjEwIj4KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjRFMDAiLz4KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjE3OTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPHBhdGggY2xhc3M9InN0OSIgZD0iTTE5LDE4LjljLTEuNCwxLjQtMy42LDEuNC00LjksMHMtMS40LTMuNiwwLTQuOUwyNywxLjFjMS40LTEuNCwzLjYtMS40LDQuOSwwYzEuNCwxLjQsMS40LDMuNiwwLDQuOUwxOSwxOC45eiIKCS8+CjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMTFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii0xLjU4MTEiIHkxPSIxNi4zNTQ3IiB4Mj0iMTAyLjQ2MzQiIHkyPSIxNi4zNTQ3Ij4KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjRFMDAiLz4KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjE3OTEiLz4KPC9saW5lYXJHcmFkaWVudD4KPHBhdGggY2xhc3M9InN0MTAiIGQ9Ik01MSwyNS44Yy00LjQsMC04LTMuNi04LThWMy42YzAtMi0xLjUtMy42LTMuNS0zLjZjLTIsMC0zLjUsMS42LTMuNSwzLjZ2MTQuMWMwLDguMyw2LjcsMTUsMTUsMTUKCWMxLjksMCwzLjUtMS42LDMuNS0zLjVDNTQuNCwyNy4zLDUyLjksMjUuOCw1MSwyNS44eiIvPgo8L3N2Zz4K';

  css = `<style>
      .code_container {
        box-sizing: border-box;
        width:100%;
        cursor: copy;
        background-color:rgba(0,0,0,.02);
        background-image: url("data:image/svg+xml;base64,${this.muxLogo}");
        background-size: 65px;
        background-repeat: no-repeat;
        background-position: bottom 20px right 20px;
        background-blend-mode:saturation;
        filter: gray;
        filter: grayscale(100%);
      }
      pre {
        margin:0;
        padding:0;
      }
      .code_container:hover {
        background-color:rgba(0,0,0,.03);
        filter: initial;
      }
      .copy_text {
        padding:.5em 1em .5em 2em;
        background:rgba(0,0,0,.03);
        font-family: Akkurat, "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size:14px;
      }
      .code {
        display: block;
        padding:1em 2em 2em 2em;
        overflow:hidden;
        overflow: auto;
        overflow-y: hidden;
      }
      .default_copy_button {
        display: inline-block;
        padding: .8em 1em;
        font-size: 16px;
        font-family: Akkurat, "Helvetica Neue", Helvetica, Arial, sans-serif;
        letter-spacing: 0px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        color: white;
        transition: color 0.1s ease 0s, background-color 0.1s ease 0s;
        border-radius: 5px;
        border: none;
        line-height: 22px;
        background-color: transparent;
        background-image: linear-gradient(to right, rgb(255, 61, 48), rgb(255, 43, 97));
      }
      .confirm_copied {
        margin-left: 1em;
        background-color: transparent;
        background-image: linear-gradient(to right, rgb(255, 61, 48), rgb(255, 43, 97));
        padding: .2em .3em .2em .4em;
        border-radius: 2px;
        color: white;
      }
      .signed_message {
        font-family: Akkurat, "Helvetica Neue", Helvetica, Arial, sans-serif;
        margin:1em 0;
        padding:1em;
        border:1px solid rgba(0,0,0,.03);
      }
      .expired {
        font-weight: bold;
      }
      @media (prefers-color-scheme: dark) {
        .code_container {
          background-color:rgba(0,0,0,.05);
        }
        .code_container:hover {
          background-color:rgba(0,0,0,.09);
        }
        .copy_text {
          background:rgba(0,0,0,.09);
        }
      }
    </style>`;

  constructor() {
    super();

    if (this.isConnected) {
      this.#init();
    }
  }

  static get observedAttributes() {
    return ['player-id', 'params', 'show-copy-button', 'show-code', 'button-title', 'docs']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#create();
  }

  set playerId(item) {
    this.setAttribute('player-id', item);
  }
  set params(item) {
    this.#params = item;
    this.setAttribute('params', item)
  }
  set showCopyButton(value) {
    if (value) this.setAttribute('show-copy-button', 'true')
    if (!value) this.removeAttribute('show-copy-button');
  }
  get hasToken() {
    return this.#hasToken;
  }
  get expirationTime() {
    const {time} = makeSignedPlaybackWarning();
    return time;
  }

  connectedCallback() {
    this.#init();
  }

  #init() {
    if (this.#isInit) {
      this.#create();
      return;
    }
    this.#isInit = true;

    const template = document.createElement('template');

    template.innerHTML = `
      ${this.css}
      <section id="root"></section>
      <slot name="copy-code-button"><button id="default_copy_button" class="default_copy_button">Copy Player Code</button></slot>
      <section id="signed_message"></section>
      <section id="more_info"></section>
    `;

    const shadow = this.attachShadow({ mode: 'open' });
    const html = template.content.cloneNode(true);
    shadow.appendChild(html);

    this.divs = {
      'root' : this.shadowRoot?.querySelector('#root'),
      'copyButton' : this.shadowRoot?.querySelector('slot[name=copy-code-button]'),
      'signedMessage' : this.shadowRoot?.querySelector('#signed_message'),
      'moreInfo' : this.shadowRoot?.querySelector('#more_info'),
    }

    this.#create();
  }

  #create() {

    this.#params      = this.getAttribute('params');
    this.#playback    = this.getAttribute('player-id');
    this.#copyButton  = this.hasAttribute('show-copy-button');
    this.#showCode    = this.hasAttribute('show-code');
    this.#buttonTitle = this.getAttribute('button-title');
    this.#docs        = this.hasAttribute('docs');

    if (!this.#buttonTitle) this.#buttonTitle = 'Copy Player Code';

    let playerParams = {};
    let attributeParams = {};

    if (this.#playback) {
      const player = document.querySelector(`#${this.#playback}`);
      if ( player && player.hasAttributes() ) {
        for (const attr of player.attributes) {
          playerParams[attr.name] = attr.value;
         }
      }
    }

    if (this.#params) {
      try {
        attributeParams = typeof(this.#params) === 'string' ? JSON.parse(this.#params) : this.#params;
      } catch(e) {
        console.error('JSON decode failed. Check the parameter has valid JSON.')
      }
    }

    const params = {
      ...attributeParams,
      ...playerParams
    }

    this.#hasToken = Object.keys(params).find( key => key === 'playback-token');
    if (this.#hasToken) {
      let token = Object.entries(params).find( (key, value) => key[0] === 'playback-token' );
      this.#token = token[1];
    }

    this.divs.root.innerHTML = "";

    this.playercode = this.#createCode(params);
    const codearea = this.#makeCodeArea(this.playercode);
    if (this.#showCode) this.divs.root.innerHTML += codearea;

    if (this.#showCode && this.shadowRoot) {
      this.divs.code = this.shadowRoot.querySelector('.code_container');
      if (this.divs.code) this.#setCopyEvent(this.#renderHTML(this.playercode), this.divs.code);
    }

    if (this.divs.copyButton && this.playercode && !this.#copyButtonListenerSet) {
      this.#setCopyButtonEvent( this.#renderHTML(this.playercode), this.divs.copyButton);
      this.#copyButtonListenerSet = true;
    }
    if (this.#copyButton) {
      this.divs.copyButton.style.display = 'unset';
    }
    if (!this.#copyButton) {
      this.divs.copyButton.style.display = 'none';
    }

    if (this.divs.signedMessage) {
      const {time, isExpired} = this.#makeSignedPlaybackWarning();
      if (isExpired) {
        this.divs.signedMessage.innerHTML = `${ this.#hasToken ? `<div class="signed_message expired">This signed playback ID expired ${time}.</div>` : ''}`;
      } else {
        this.divs.signedMessage.innerHTML = `${ this.#hasToken ? `<div class="signed_message">This signed playback ID will expire ${time}.</div>` : ''}`;
      }
    }

    if (this.#docs && this.shadowRoot) {
      this.divs.moreInfo.innerHTML = this.#getDocsText();
    } else {
      this.divs.moreInfo.innerHTML = '';
    }

  }

  #createCode(params) {
    let html = `&lt;script src=&quot;https://unpkg.com/@mux/mux-player&quot;&gt;&lt;/script&gt;

&lt;mux-video
    `;
    html += this.#createCodeParams(params);
    html += `style="width:100%"`;
    html += `
/&gt;`;
    return html;
  }

  #createCodeParams(params) {
    if (!params) return '';

    let html = '';
    for (const [name, value] of Object.entries(params)) {
      if (value) {
        html += `${name}="${value}"
    `;
      }
    };
    return html;
  }

  #makeCodeArea(playercode) {
    if (!playercode) return 'No Code Created';
    const {time, signedMessage} = this.#makeSignedPlaybackWarning();
    return `<div class="code_container"><div class="copy_text">${this.#buttonTitle} (${ this.#hasToken ? signedMessage : ''})</div><pre><code class="code">${playercode}</code></pre></div>`;
  }

  #makeSignedPlaybackWarning() {
    let time = '';
    let signedMessage = '';
    let isExpired = false;

    if (this.#token) {
      let jwt = this.parseJwt(this.#token);
      let hasRestrictions = 'playback_restriction_id' in jwt;
      let expiration = new Date(0).setUTCSeconds(jwt.exp);
      time = this.getRelativeTimeDistance(expiration);
      isExpired = expiration < new Date();

      if (isExpired) {
        signedMessage = `<span class="signed">Signed, expired ${time}.</span>`;
      } else {
        signedMessage = `<span class="signed">Signed, expires ${time} ${hasRestrictions ? ' and has playback restrictions' : ''}.</span>`;
      }
    }

    return {time, signedMessage, isExpired}
  }

  #setCopyEvent(code, div) {
    if (!div || !code) return;

    div.addEventListener('click', () => {
      navigator.clipboard.writeText(code).then(() => {
        this.dispatchEvent(new CustomEvent('copied', { details: code}));
        const copy_text = this.shadowRoot.querySelector('.copy_text');
        if (copy_text) {
          copy_text.append(this.#successfullCopyDiv())
          setTimeout( () => {
            let confirm = copy_text.parentElement.querySelector('.confirm_copied');
            if (confirm) confirm.remove();
          }, 3000)
        }
      })
    })
  }

  #setCopyButtonEvent(code, div) {
    if (!div || !code) return;

    div.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('copied', { details: code}));
      navigator.clipboard.writeText(code).then(() => {
        let button = div.querySelector('button');
        button.classList.add('clicked');
        button.innerText = 'Copied!';
        setTimeout( () => {
          button.innerText = 'Copy Player Code';
          button.classList.remove('clicked');
        }, 5000)
      })
    })
  }

  #successfullCopyDiv() {
    const div = document.createElement('span');
    div.classList.add('confirm_copied')
    div.innerText = 'Copied!';
    return div;
  }

  #getDocsText() {
    return `<p>Learn more about <a href="https://docs.mux.com/guides/video/mux-player">Mux Player</a></p>`;
  }

  // &lt;string&gt; to <string>
  #renderHTML(string) {
    string = string.replaceAll('&lt;', "<")
    string = string.replaceAll('&gt;', '>')
    string = string.replaceAll('&quot;', '"')
    string = string.replaceAll('&quot;', "'")
    return string;
  }

  // <string> to &lt;string&gt;
  #encodeHTML(string) {
    string = string.replaceAll('<', '&lt;')
    string = string.replaceAll('"', '&quot;')
    string = string.replaceAll('>', '&gt;')
    string = string.replaceAll("'", '&quot;')
    return string;
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getRelativeTimeDistance(d1, d2 = new Date()) {
    const units = {
      year  : 24 * 60 * 60 * 1000 * 365,
      month : 24 * 60 * 60 * 1000 * 365/12,
      day   : 24 * 60 * 60 * 1000,
      hour  : 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000
    }
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const elapsed = d1 - d2;
    for (var u in units)
      if (Math.abs(elapsed) > units[u] || u == 'second')
        return rtf.format(Math.round(elapsed/units[u]),u)
  }

}
window.customElements.define('mux-player-code', GetPlayerCode);