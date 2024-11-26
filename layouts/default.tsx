import ErrorBoundary from '@/components/common/ErrorBoundary'
import Header from '@/components/header/header'
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-[100vh]">
      <Header />
      <main className="flex justify-center py-10 h-full overflow-auto">
        <section className="flex flex-col items-start">
          <ErrorBoundary>{children}</ErrorBoundary>
        </section>
      </main>
      <footer className="p-2 bg-primary text-white">
        <p>&copy; {new Date().getFullYear()} My Site</p>
      </footer>
    </div>
  )
}
