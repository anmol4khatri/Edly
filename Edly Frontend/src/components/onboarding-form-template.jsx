import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Upload, Building } from "lucide-react"

export function OnboardingForm({ className, ...props }) {
  const [qualifications, setQualifications] = useState([""])
  const [logoPreview, setLogoPreview] = useState(null)
  const [subdomain, setSubdomain] = useState("")

  const addQualification = () => {
    setQualifications([...qualifications, ""])
  }

  const removeQualification = (index) => {
    if (qualifications.length > 1) {
      setQualifications(qualifications.filter((_, i) => i !== index))
    }
  }

  const updateQualification = (index, value) => {
    const updated = [...qualifications]
    updated[index] = value
    setQualifications(updated)
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const checkSubdomainAvailability = (value) => {
    // Simple validation - in real app, you'd check against your backend
    const isValid = /^[a-zA-Z0-9-]+$/.test(value) && value.length >= 3
    return isValid
  }

  const isSubdomainValid = checkSubdomainAvailability(subdomain)

  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Tell us about yourself and your organization to get started
        </p>
      </div>
      <div className="grid gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personal Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="min-h-[100px]" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              placeholder="e.g., 5"
              required />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Qualifications</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addQualification}
                className="h-8 bg-transparent">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {qualifications.map((qualification, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Bachelor's in Computer Science"
                    value={qualification}
                    onChange={(e) => updateQualification(index, e.target.value)} />
                  {qualifications.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeQualification(index)}
                      className="h-10 w-10 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Organization Information</h3>

          <div className="grid gap-2">
            <Label htmlFor="orgName">Organization Name</Label>
            <Input id="orgName" placeholder="Acme Inc." required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="logo">Organization Logo</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden" />
                <Label
                  htmlFor="logo"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  {logoPreview ? (
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo preview"
                      className="max-h-28 max-w-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-8 w-8" />
                      <span className="text-sm">Click to upload logo</span>
                    </div>
                  )}
                </Label>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subdomain">Subdomain</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                placeholder="your-organization"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9-]/g, ""))}
                className={cn(
                  subdomain && !isSubdomainValid && "border-red-500 focus-visible:ring-red-500"
                )} />
              <span className="text-sm text-muted-foreground whitespace-nowrap">.edly.com</span>
            </div>
            {subdomain && (
              <div
                className={cn(
                  "flex items-center gap-2 text-sm mt-1",
                  isSubdomainValid ? "text-green-600" : "text-red-500"
                )}>
                <Building className="h-3 w-3" />
                <span>
                  {isSubdomainValid
                    ? `${subdomain}.yourapp.com is available`
                    : "Subdomain must be at least 3 characters and contain only letters, numbers, and hyphens"}
                </span>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Complete Setup
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        By completing setup, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
      </div>
    </form>)
  );
}
