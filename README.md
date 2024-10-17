# 🌟 Octasol

[Octasol](https://octasol.io/) is a cutting-edge, open-source bounty platform reimagining how open-source projects are managed on GitHub. It connects maintainers with skilled contributors worldwide, making collaboration more efficient and rewarding.

At the heart of Octasol is a **trustless bounty system** that enables maintainers to escrow funds for resolving GitHub issues, rewarding contributors securely and transparently. In addition to the bounty system, we have integrated a **Dev ID platform**, where developers can showcase their proof of work by connecting various coding profiles like GitHub, LeetCode, HackerRank, and more.

💡 **Dev ID System**: The Dev ID allows contributors to consolidate their profiles across multiple platforms, serving as a verified portfolio that can be used to secure future bounties.

## 🚀 How It Works

### 🛠️ For Maintainers

1. **Post Issues**: Easily post issues from your GitHub repositories and attach bounties to attract skilled contributors.
2. **Escrow Setup**: During negotiations, set up an escrow through Octasol.
3. **Fund Transfer**: If the pull request is merged, the escrowed funds are instantly transferred to the contributor’s Solana wallet. If the pull request is closed or canceled, the funds are safely returned to your account.

### 🌍 For Contributors

1. **Signal Interest**: Signal your interest by submitting blank pull requests to issues with bounties.
2. **Negotiate**: Negotiate directly with maintainers to finalize the bounty amount.
3. **Get Paid**: Upon successful merge of your pull request, receive the escrowed funds in your Solana wallet.

### 🆕 Dev ID Platform

In addition to the bounty system, Octasol has launched a **Dev ID platform** at [octasol.io](https://octasol.io), where developers can connect various coding and contribution profiles such as:

- GitHub
- LeetCode
- GeeksforGeeks
- HackerRank
- CodeChef
- SuperteamEarn
- Codeforces (coming soon)
- Gitlab (coming soon)

This unified profile serves as **proof of work**, which can be shared with maintainers to increase your chances of winning bounties. Verification is quick and secure via the [**Reclaim Protocol**](https://reclaimprotocol.org/) — just scan a QR code, log in through the provided link, and get verified instantly!

## 🛠️ Tech Stack

- **Application**: Next.js + TypeScript + Tailwind
- **Blockchain**: Solana
- **Smart Contract**: Rust (Anchor)
- **Additional Tools**: Shadcn, Acertinity UI
- **Database**: Prisma + PostgreSQL

## ✨ Features

- **Trustless Bounty System**: Ensures secure transactions with an escrow system.
- **Global Talent Pool**: Attracts top-tier contributors from around the world.
- **Seamless Integration**: Easily integrates with your existing GitHub workflow.
- **Unified Dev ID Profiles**: Showcase your developer identity across platforms.
- **Quick Verification**: Using Reclaim Protocol for fast, secure profile authentication.

## 🌟 Getting Started

### Prerequisites

- Node.js
- Yarn
- Solana Wallet

### Installation

1. **Fork the repository**
   Click the "Fork" button in the upper right corner of the repository.

2. **Clone the repository**

   ```bash
   git clone https://github.com/<yourusername>/octasol.git
   cd octasol
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

### Smart Contract Deployment (Coming Soon)

Our smart contracts are under development and will be available soon. Stay tuned for updates!

### Configuration

**Set up environment variables**
Create a `.env.local` file in the root directory and add your configuration:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXTAUTH_SECRET=
NEXT_PUBLIC_GITHUB_APP_INSTALLATION_CALLBACK_URL=
DATABASE_URL=
DATABASE_URL_LOCAL=
EMAIL_SERVER=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
RECLAIM_APP_ID=
RECLAIM_APP_SECRET=
NEXTAUTH_URL=
```

## 🔐 Authentication

Octasol uses GitHub OAuth for authentication. Ensure you have the appropriate environment variables set up as shown above.

## 🤝 Contributing

We welcome contributions from the community! Here’s how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
---
## 📩 Contact 

1. Discord: https://discord.gg
2. Telegram: https://t.me/octasol
3. Email: contact@octasol.io

---

Octasol makes open-source collaboration more efficient and rewarding, ensuring contributions are valued and compensated. Join the future of open-source development today at [octasol.io](https://octasol.io)!

---
