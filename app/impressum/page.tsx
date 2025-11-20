export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Impressum</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Angaben gemäß § 5 TMG</h2>
              <p className="leading-relaxed">
                menter Digital GmbH<br />
                Freiheitstr. 2<br />
                66125 Saarbrücken
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Handelsregister</h2>
              <p className="leading-relaxed">
                Handelsregister: HRB 18914<br />
                Registergericht: Amtsgericht Saarbrücken
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Vertreten durch</h2>
              <p className="leading-relaxed">
                Herrn Mario Janzen<br />
                Herrn Moritz Diehl
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Kontakt</h2>
              <p className="leading-relaxed">
                Telefon: 06897 - 9660137<br />
                Telefax: 06897 - 9660138<br />
                E-Mail: <a href="mailto:admin@menter.digital" className="text-pink-600 hover:underline">admin@menter.digital</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
              <p className="leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE274601585
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Redaktionell verantwortlich</h2>
              <p className="leading-relaxed">
                Mario Janzen<br />
                Freiheitstr. 2<br />
                66125 Saarbrücken
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a href="/" className="text-pink-600 hover:text-pink-700 font-medium">
              ← Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
