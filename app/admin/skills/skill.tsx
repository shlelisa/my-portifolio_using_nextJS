import React, { useEffect, useState } from 'react'
import { supabase } from '@/app/supabase/supabaseClient'

type SkillType = {
  id: number
  name: string
}

const Skill = () => {
  const [skills, setSkills] = useState<SkillType[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('id')
    if (!error) setSkills(data)
  }

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return
    const { error } = await supabase.from('skills').insert({ name: newSkill })
    if (!error) {
      setNewSkill('')
      fetchSkills()
    }
  }

  const handleUpdateSkill = async (id: number) => {
    if (!editValue.trim()) return
    const { error } = await supabase.from('skills').update({ name: editValue }).eq('id', id)
    if (!error) {
      setEditId(null)
      setEditValue('')
      fetchSkills()
    }
  }

  const handleDeleteSkill = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this skill?')
    if (!confirmDelete) return
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (!error) fetchSkills()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '10px' }}>Manage Skills</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter new skill"
          style={{ padding: '6px', marginRight: '10px', width: '200px' }}
        />
        <button
          onClick={handleAddSkill}
          style={{
            padding: '6px 12px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Skill
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {skills.map((skill) => (
          <li
            key={skill.id}
            style={{
              marginBottom: '10px',
              background: '#f5f5f5',
              padding: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '4px',
            }}
          >
            {editId === skill.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ padding: '5px', flex: 1, marginRight: '10px' }}
                />
                <button
                  onClick={() => handleUpdateSkill(skill.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'gray',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{skill.id}</span>
                <span>{skill.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditId(skill.id)
                      setEditValue(skill.name)
                    }}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#FFC107',
                      border: 'none',
                      marginRight: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#DC3545',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Skill
