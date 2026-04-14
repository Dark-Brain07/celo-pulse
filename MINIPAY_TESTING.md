# 📱 MiniPay Testing Guide for CeloPulse

This guide covers how to test CeloPulse inside the **MiniPay** wallet — Opera's mobile wallet built on the Celo blockchain.

---

## 1. Install MiniPay

MiniPay is available as a standalone app on both platforms:

| Platform | Link |
|----------|------|
| **Android** | [Google Play Store](https://play.google.com/store/apps/details?id=com.opera.minipay) |
| **iOS** | [Apple App Store](https://apps.apple.com/de/app/minipay-easy-global-wallet/id6504087257) |

### Initial Setup
1. Download and open MiniPay
2. Sign up using your **Google account** and **phone number**
3. Your Celo wallet is created automatically

---

## 2. Enable Developer Mode

Developer mode is **required** to test custom URLs (like your local app via ngrok):

1. Open MiniPay → **Settings** (gear icon)
2. Scroll to the **About** section
3. Tap the **Version number** repeatedly (7+ times) until you see a confirmation message
4. Go back to **Settings** → you'll now see **Developer Settings**
5. Enable **Developer Mode**
6. Toggle **Use Testnet** to connect to **Celo Sepolia** testnet (for testing with test tokens)

---

## 3. Get Testnet Tokens

You need test CELO and test USDm (cUSD) on the Celo Sepolia testnet:

### Celo Faucet
- Visit: [https://faucet.celo.org/celo-sepolia](https://faucet.celo.org/celo-sepolia)
- Paste your MiniPay wallet address
- Request test CELO

### Your MiniPay Address
To find your address in MiniPay:
- Open MiniPay → Tap your profile/balance area
- Your wallet address will be displayed — copy it

---

## 4. Set Up Local Testing with ngrok

Since MiniPay runs on your phone, you need to expose your local dev server to the internet.

### Install ngrok

```bash
# macOS (Homebrew)
brew install ngrok

# Windows (Chocolatey)
choco install ngrok

# Or download from: https://ngrok.com/download
```

### Create an ngrok Account
1. Sign up at [https://ngrok.com](https://ngrok.com)
2. Get your auth token from the dashboard
3. Run: `ngrok config add-authtoken YOUR_TOKEN`

### Start Your Dev Server + Tunnel

```bash
# Terminal 1: Start the Next.js dev server
cd celo-pulse
npm run dev

# Terminal 2: Create an ngrok tunnel to port 3000
ngrok http 3000
```

ngrok will give you a public URL like:
```
https://abc123.ngrok-free.app
```

> ⚠️ **Note:** The ngrok URL changes every time you restart it (free plan). Keep ngrok running while testing.

---

## 5. Load CeloPulse in MiniPay

1. Open MiniPay on your phone
2. Go to **Settings** → **Developer Settings**
3. Tap **Load Test Page**
4. Enter your ngrok URL: `https://abc123.ngrok-free.app`
5. Tap **Go**

CeloPulse should load inside MiniPay's WebView with:
- ✅ Green banner: "Connected via MiniPay — Gas fees paid in USDm"
- ✅ Wallet auto-connected (no "Connect Wallet" button)
- ✅ Your MiniPay address displayed in the header

---

## 6. Test All Features

### Verification Checklist

| Feature | What to Test | Expected Behavior |
|---------|-------------|-------------------|
| **Auto-connect** | Open app in MiniPay | Wallet connects automatically, address shown |
| **MiniPay banner** | Check header area | Green "Connected via MiniPay" banner visible |
| **Connect button** | Check header | "Connect Wallet" button should be **hidden** |
| **Daily Check-in** | Tap "Daily Check-in" | Transaction sent with USDm fee currency |
| **Play Action** | Tap "Play Action" | Transaction uses USDm for gas |
| **Quick Reactions** | Tap any emoji reaction | Transaction uses USDm for gas |
| **Send Tip** | Enter address + amount | Tip transaction uses USDm for gas |
| **Claim Reward** | Tap "Claim Reward" | Reward claim uses USDm for gas |
| **Register** | Try registering | Registration tx uses USDm for gas |
| **Register with referral** | Paste referrer address | Referral registration tx uses USDm for gas |
| **No popups** | Any action | No wallet popups/redirects — all inline |

### Testing Gas Fee Currency

When inside MiniPay, all transactions should include:
```
feeCurrency: "0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"
```

This means gas is paid in **USDm** instead of CELO. You can verify this by checking the transaction on [CeloScan](https://celoscan.io).

---

## 7. Testing on Mainnet vs Testnet

| Network | When to Use | Toggle |
|---------|------------|--------|
| **Celo Sepolia** (testnet) | Development & testing | Enable "Use Testnet" in Developer Settings |
| **Celo Mainnet** | Production | Disable "Use Testnet" in Developer Settings |

### Switching Networks
1. Open MiniPay → **Developer Settings**
2. Toggle **Use Testnet** on/off
3. The app will reload with the appropriate network

---

## 8. Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| App doesn't load in MiniPay | Check ngrok is running, URL is correct |
| "No wallet found" error | Make sure you're inside MiniPay's WebView, not a regular browser |
| Transaction fails | Ensure you have enough CELO/USDm for gas on the correct network |
| ngrok URL expired | Restart ngrok, get new URL, re-enter in MiniPay |
| Chain switching error | CeloPulse skips chain switching in MiniPay — this shouldn't happen |
| Page is blank/white | Check browser console via `chrome://inspect` (see below) |

### Remote Debugging MiniPay WebView

On Android, you can debug the MiniPay WebView:
1. Connect your phone to your computer via USB
2. Enable USB debugging on your phone
3. Open Chrome on desktop → navigate to `chrome://inspect`
4. You should see the MiniPay WebView listed
5. Click "Inspect" to open DevTools for the WebView

---

## 9. Environment Variables

For testing with deployed contracts on Celo Sepolia, update your `.env`:

```env
NEXT_PUBLIC_CONTRACT_ACTIVITY_MANAGER=0x...
NEXT_PUBLIC_CONTRACT_REWARD_DISTRIBUTOR=0x...
NEXT_PUBLIC_CONTRACT_MICRO_ACTIONS=0x...
NEXT_PUBLIC_CONTRACT_LEADERBOARD=0x...
NEXT_PUBLIC_CONTRACT_REFERRAL_SYSTEM=0x...
NEXT_PUBLIC_RPC_URL=https://alfajores-forno.celo-testnet.org
```

---

## 10. Useful Links

- [MiniPay Quickstart Docs](https://docs.celo.org/build-on-celo/build-on-minipay/quickstart)
- [MiniPay Code Library](https://docs.celo.org/build-on-celo/build-on-minipay/code-library)
- [MiniPay Deeplinks](https://docs.celo.org/build-on-celo/build-on-minipay/deeplinks)
- [Celo Sepolia Faucet](https://faucet.celo.org/celo-sepolia)
- [CeloScan Explorer](https://celoscan.io)
- [ngrok Download](https://ngrok.com/download)
