// src/components/Palette.tsx
import React from 'react'
import { Animal } from '../types'

export default function Palette({ onSelect, selectedAnimal, animals }: { onSelect: (animal: Animal) => void, selectedAnimal: Animal | null, animals: Animal[] }) {
  // Validate animals
  if (!Array.isArray(animals) || animals.length < 9) {
    return <div style={{ color: '#b91c1c' }}>Invalid animal set.</div>
  }

  return (
    <div className="flex flex-col space-y-2 p-4">
      {animals.map((a: any) => (
        <button
          key={a.id}
          onClick={() => onSelect(a)}
          className={`flex flex-col items-center p-2 rounded-lg border ${selectedAnimal?.id === a.id ? 'ring-2 ring-offset-2' : ''}`}
          aria-pressed={selectedAnimal?.id === a.id}
          title={a.name}
        >
          <div className="text-2xl">{a.emoji}</div>
          <div className="text-xs text-gray-500">{a.name}</div>
        </button>
      ))}
    </div>
  )
}