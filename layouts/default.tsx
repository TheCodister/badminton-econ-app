import Header from '@/components/header/header'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/breadcrumbs'
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col">
      <Header />
      <main className="flex justify-center py-2 h-full">
        <section className="flex flex-col items-start">
          <div className="p-4">
            <Breadcrumbs>
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Racket</BreadcrumbItem>
              <BreadcrumbItem>Lining</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          {children}
        </section>
      </main>
      <footer className="p-2 bg-primary text-white">
        <p>&copy; {new Date().getFullYear()} My Site</p>
      </footer>
    </div>
  )
}
