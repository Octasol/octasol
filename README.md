# 🌟 Octasol

Octasol is a cutting-edge, open-source bounty platform reimagining how open-source projects are managed on GitHub. It connects maintainers with skilled contributors worldwide, making collaboration more efficient and rewarding.

## 🚀 How It Works

### 🛠️ For Maintainers

1. **Post Issues**: Easily post issues from your GitHub repositories and attach bounties to attract skilled contributors.
2. **Escrow Setup**: During negotiations, set up an escrow through Octasol.
3. **Fund Transfer**: If the pull request is merged, the escrowed funds are instantly transferred to the contributor’s Solana wallet. If the pull request is closed or canceled, the funds are safely returned to your account.

### 🌍 For Contributors

1. **Signal Interest**: Signal your interest by submitting blank pull requests to issues with bounties.
2. **Negotiate**: Negotiate directly with maintainers to finalize the bounty amount.
3. **Get Paid**: Upon successful merge of your pull request, receive the escrowed funds in your Solana wallet.

## 🛠️ Tech Stack

- **Application**: Next.js + TypeScript + Tailwind
- **Blockchain**: Solana
- **Smart Contract**: Rust (Anchor)
- **Additional Tools**: Shadcn, Acertinity UI
- **Database**: Prisma + PostgreSQL (being implemented in dev branch)

## ✨ Features

- **Trustless Bounty System**: Ensures secure transactions with an escrow system.
- **Global Talent Pool**: Attracts top-tier contributors from around the world.
- **Seamless Integration**: Easily integrates with your existing GitHub workflow.

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

GITHUB_LOGIN_CLIENT_ID=
GITHUB_LOGIN_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GITHUB_PRIVATE_KEY_FILE_NAME=
GITHUB_APP_ID=
NEXT_PUBLIC_GITHUB_APP_INSTALLATION_CALLBACK_URL=
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

Octasol makes open-source collaboration more efficient and rewarding, ensuring contributions are valued and compensated. Join the future of open-source development today!
