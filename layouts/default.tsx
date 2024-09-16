import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/siderbar'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <main className="flex justify-center py-2 overflow-y-auto h-full">
        <Sidebar />
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
      <footer className="p-4 bg-gray-800 text-white">
        <p>&copy; {new Date().getFullYear()} My Site</p>
      </footer>
    </div>
  )
}
