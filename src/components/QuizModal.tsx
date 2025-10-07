import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'

interface QuizModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function QuizModal({ open, setOpen }: QuizModalProps) {
  const [formData, setFormData] = useState({
    petType: '',
    allergies: '',
    activityLevel: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mock recommendation logic
    let recommendation = 'Royal Chicken Feast'
    if (formData.petType === 'Cat' || formData.petType === 'Puppy / Kitten') {
      recommendation = 'Gentle Kitten Blend'
    } else if (formData.allergies === 'Chicken') {
      recommendation = 'Silky Coat Salmon Mix'
    }
    
    alert(`Recommendation: ${recommendation}`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Nutrition Quiz</DialogTitle>
          <DialogDescription>
            Get a recommended plan in 30 seconds with just 3 questions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Pet Type</Label>
            <Select value={formData.petType} onValueChange={(value) => setFormData({...formData, petType: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select pet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dog">Dog</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Puppy / Kitten">Puppy / Kitten</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Any Allergies?</Label>
            <Select value={formData.allergies} onValueChange={(value) => setFormData({...formData, allergies: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select allergies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No known allergies</SelectItem>
                <SelectItem value="Grain">Grain sensitive</SelectItem>
                <SelectItem value="Chicken">Chicken sensitive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Activity Level</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low - Mostly indoor, minimal exercise</SelectItem>
                <SelectItem value="Moderate">Moderate - Regular walks and playtime</SelectItem>
                <SelectItem value="High">High - Very active, lots of exercise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              type="submit" 
              className="flex-1 bg-red-500 hover:bg-red-600"
              disabled={!formData.petType || !formData.allergies || !formData.activityLevel}
            >
              Get Recommendation
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}