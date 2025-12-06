// src/components/TutorialOverlay.tsx
import { useEffect, useState } from 'react'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage'

export default function TutorialOverlay() {
  const [dismissed, setDismissed] = useState(() => loadFromLocalStorage('tutorial-dismissed') === true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!dismissed) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setDismissed(true)
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }
  }, [dismissed])

  if (dismissed) return null

  const steps = [
    { title: 'Welcome to Animal Sudoku', text: 'Choose animals from the palette and place them on the board. Use pencil mode for notes.' },
    { title: 'Pencil Mode', text: 'Toggle Pencil to add multiple candidates inside a cell.' },
    { title: 'Hint Button', text: 'Use the hint (💡) to reveal a safe placement.' },
  ]

  function closeAndPersist() {
    saveToLocalStorage('tutorial-dismissed', true)
    setDismissed(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
      <div style={{ width: 520, maxWidth: 'calc(100% - 24px)', background: 'white', padding: 20, borderRadius: 12, boxShadow: '0 8px 30px rgba(2,6,23,0.6)' }}>
        <h3 style={{ margin: 0 }}>{steps[step].title}</h3>
        <p style={{ marginTop: 8 }}>{steps[step].text}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <div>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={step === 0}>Back</button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2" disabled={step === steps.length - 1}>Next</button>
          </div>
          <div>
            <label style={{ marginRight: 8 }}>
              <input type="checkbox" onChange={e => { if (e.target.checked) closeAndPersist() }} /> Don't show again
            </label>
            <button onClick={closeAndPersist} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}