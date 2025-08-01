import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div>
            a site about the crafts that make Lara happy
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <p>FOOTER COMING SOON...</p>
        </footer>
      </div>
    </>
  );
}
