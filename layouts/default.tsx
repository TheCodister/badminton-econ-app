import ErrorBoundary from '@/components/common/ErrorBoundary'
import Header from '@/components/header/header'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs'
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-[100vh]">
      <Header />
      <main className="flex justify-center py-2 h-full overflow-auto">
        <section className="flex flex-col items-start">
          <div className="p-4">
            <Breadcrumbs>
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Racket</BreadcrumbItem>
              <BreadcrumbItem>Lining</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <ErrorBoundary>{children}</ErrorBoundary>
        </section>
      </main>
      <footer className="p-2 bg-primary text-white">
        <p>&copy; {new Date().getFullYear()} My Site</p>
      </footer>
    </div>
  )
}
