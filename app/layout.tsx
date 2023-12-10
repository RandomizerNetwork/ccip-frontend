
import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import { Web3ModalProvider } from '@/utils/providers/Web3Modal'
import ServicesBalances from '@/components/partials/services/ServicesBalances';
import Layout from '@/components/Layout';
import VConsole from '@/components/partials/Vconsole';
import '@total-typescript/ts-reset';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chainlink CCIP',
  description: 'The era of secure blockchain interoperability has arrived.',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDev = process.env.NEXT_PUBLIC_DEVELOPMENT_NODE_ENV === 'development'
  return (
    <>
    <html lang="en" suppressHydrationWarning={isDev}>
      <body className={montserrat.className}>
          <VConsole />
          <Web3ModalProvider>
            <Layout>
              {children}
              <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                draggable={true}
                closeOnClick={true}
                pauseOnHover={true}
                />
            </Layout>
            <ServicesBalances />
          </Web3ModalProvider>
      </body>
    </html>
    </>
  )
}
