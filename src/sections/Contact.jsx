import { useState } from 'react'

import SectionHeader from '../components/SectionHeader'
import { profile } from '../data/profile'

/* Envoi du formulaire — FormSubmit.co
   → aucun compte, aucune clé d'API : il suffit d'une adresse
     e-mail. Le premier message reçu demande une confirmation.
   → pour un autre service (Formspree, Web3Forms…), définissez
     VITE_FORM_ENDPOINT dans .env (voir .env.example) */
const ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${profile.email}`

const STATUS = {
  sending: 'ENVOI EN COURS…',
  sent: 'MESSAGE ENVOYÉ. JE RÉPONDS TRÈS VITE.',
  error: "L'ENVOI A ÉCHOUÉ. RÉESSAYEZ OU ÉCRIVEZ-MOI DIRECTEMENT.",
  fallback: 'VOTRE MESSAGERIE A ÉTÉ OUVERTE.',
}

function Field({ label, type = 'text', value, onChange, textarea, rows = 5 }) {
  const shared =
    'w-full border-b border-[rgba(244,238,229,.2)] bg-transparent py-3 text-[14px] text-cream outline-none transition-colors placeholder:text-[rgba(244,238,229,.25)] focus:border-ember'

  return (
    <label className="block">
      <span className="mb-3 block text-[8px] track text-[rgba(244,238,229,.4)]">
        {label}
      </span>

      {textarea ? (
        <textarea
          rows={rows}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Votre message"
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          type={type}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={label}
          className={shared}
        />
      )}
    </label>
  )
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState(null)

  /* Repli : ouvre la messagerie du visiteur */
  const openMailClient = () => {
    const subject = encodeURIComponent(`Message de ${name || 'votre nom'}`)
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus('sending')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Nouveau message — ${name || 'visite du portfolio'}`,
          _honey: honeypot,
          _template: 'table',
          name,
          email,
          message,
        }),
      })

      const data = await response.json()

      /* FormSubmit renvoie la chaîne "true"/"false" :
         un simple `if (data.success)` serait toujours vrai */
      const sent = data.success === true || data.success === 'true'

      if (sent) {
        setName('')
        setEmail('')
        setMessage('')
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      openMailClient()
      setStatus('fallback')
    }
  }

  return (
    <section
      id="contact"
      className="relative border-t border-[rgba(244,238,229,.12)] py-24 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="03"
          label="CONTACT"
          title="ÉCRIVONS"
          intro="Une idée, un projet, une question ? Écrivez-moi, je réponds généralement sous 48 h."
        />

        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr] md:gap-24">
          {/* Details */}
          <div>
            <div className="flex items-center gap-3 text-[9px] track-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>

              <span className="text-[rgba(244,238,229,.7)]">
                {profile.availability}
              </span>
            </div>

            <div className="mt-12 flex flex-col gap-8">
              <div>
                <div className="mb-2 text-[8px] track text-[rgba(244,238,229,.35)]">
                  EMAIL
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-[clamp(18px,2.4vw,30px)] font-light tracking-[-.04em] transition-colors duration-300 hover:text-ember"
                >
                  {profile.email}
                </a>
              </div>

              <div>
                <div className="mb-2 text-[8px] track text-[rgba(244,238,229,.35)]">
                  TÉLÉPHONE
                </div>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="text-[15px] text-[rgba(244,238,229,.75)] transition-colors duration-300 hover:text-ember"
                >
                  {profile.phone}
                </a>
              </div>

              <div>
                <div className="mb-2 text-[8px] track text-[rgba(244,238,229,.35)]">
                  BASÉ À
                </div>

                <div className="text-[15px] text-[rgba(244,238,229,.75)]">
                  {profile.location}
                </div>
              </div>
            </div>

            <div className="mt-14">
              <div className="mb-5 text-[8px] track text-[rgba(244,238,229,.35)]">
                SUIVRE
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="border border-[rgba(244,238,229,.2)] px-4 py-3 text-[9px] track-sm text-[rgba(244,238,229,.65)] transition-colors duration-300 hover:border-cream hover:text-cream"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-9">
            <Field label="NOM" value={name} onChange={setName} />
            <Field label="EMAIL" type="email" value={email} onChange={setEmail} />
            <Field
              label="MESSAGE"
              value={message}
              onChange={setMessage}
              textarea
            />

            {/* Spam trap — invisible aux humains */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="absolute h-0 w-0 opacity-0"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 w-fit cursor-pointer border border-cream bg-cream px-10 py-4 text-[10px] track-sm text-ink transition-colors duration-300 hover:bg-transparent hover:text-cream disabled:cursor-wait disabled:opacity-50"
            >
              {status === 'sending' ? 'ENVOI…' : 'ENVOYER LE MESSAGE'}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`text-[9px] leading-[1.7] tracking-[.05em] transition-opacity duration-300 ${
                status === 'error'
                  ? 'text-ember'
                  : 'text-[rgba(244,238,229,.45)]'
              } ${status ? 'opacity-100' : 'opacity-0'}`}
            >
              {status ? STATUS[status] : ' '}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
