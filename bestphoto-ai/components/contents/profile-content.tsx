"use client"

import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Save, Edit, Camera, Crown, Calendar, MapPin, Phone, Globe, Mail, Lock, Eye, EyeOff, Upload } from "lucide-react"
import { useAuth } from "@/components/context/AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { updateProfile, updateEmail, sendEmailVerification, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { auth } from "@/lib/firebase"
import toast from "react-hot-toast"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useTheme } from "next-themes"

export function ProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingEmail, setIsChangingEmail] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profile, setProfile] = useState({
    name: "Loading...",
    email: "loading...",
    phone: "",
    location: "",
    website: "",
    bio: "",
    joinDate: "",
    plan: "Free",
    avatarUrl: "/placeholder.svg",
  })
  const [loadingUser, setLoadingUser] = useState(true)
  const [showAvatarOptions, setShowAvatarOptions] = useState(false)
  const [loadingSessions, setLoadingSessions] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { user, loading } = useAuth()
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => {
    if (!loading && user) {
      setProfile({
        name: user.displayName || "User",
        email: user.email || "",
        phone: "",
        location: "",
        website: "",
        bio: "",
        joinDate: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "",
        plan: "Free",
        avatarUrl: user.photoURL || "/placeholder.svg",
      })
      setLoadingUser(false)
    } else if (!loading && !user) {
      setProfile({
        name: "Guest",
        email: "guest@example.com",
        phone: "",
        location: "",
        website: "",
        bio: "",
        joinDate: "N/A",
        plan: "Free",
        avatarUrl: "/placeholder.svg",
      })
      setLoadingUser(false)
    } else if (loading) {
      setLoadingUser(true)
    }
  }, [user, loading])

  const [newEmail, setNewEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  const handleEmailChange = async () => {
    if (!auth.currentUser) {
      toast.error("User not logged in.")
      return
    }
    if (!auth.currentUser.emailVerified) {
      toast.error("Please verify your new email before continuing.")
    }
    
    if (newEmail === profile.email) {
      toast("New email is the same as current email.")
      setIsChangingEmail(false)
      setNewEmail("")
      return
    }

    try {
      // 1. Yeni email adresini güncelle
      await updateEmail(auth.currentUser, newEmail)

      // 2. Yeni email adresine doğrulama emaili gönder
      await sendEmailVerification(auth.currentUser)

      // 3. State güncelle
      setProfile({ ...profile, email: newEmail })
      toast.success("Email updated. Please check your inbox to verify the new email.")
      
      setIsChangingEmail(false)
      setNewEmail("")
    } catch (error: any) {
      console.error("Error updating email:", error)
      if (error.code === 'auth/requires-recent-login') {
        toast.error("Please log in again to change your email.")
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email address format.")
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error("This email is already in use.")
      } else if (error.code === 'auth/operation-not-allowed') {
        toast.error("Email update is not allowed. Check your Firebase Authentication settings.")
      } else {
        toast.error(`Failed to update email: ${error.message || 'Unknown error'}`)
      }
    }
  }

  const handlePasswordChange = async () => {
    if (!auth.currentUser) {
      toast.error("User not logged in.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.")
      return
    }

    if (!currentPassword) {
       toast.error("Please enter your current password.")
       return
    }

    try {
      // Re-authenticate user with their current password
      const credential = EmailAuthProvider.credential(auth.currentUser.email!, currentPassword)
      await reauthenticateWithCredential(auth.currentUser, credential)

      // Update password
      await updatePassword(auth.currentUser, newPassword)

      toast.success("Password updated successfully!")
      setIsChangingPassword(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

    } catch (error: any) {
      console.error("Error changing password:", error)
      if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect current password.")
      } else if (error.code === 'auth/requires-recent-login') {
        toast.error("Please log in again to change your password.")
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password is too weak.")
      } else {
        toast.error(`Failed to update password: ${error.message || 'Unknown error'}`)
      }
      // Do not close modal on error, allow user to try again or correct input
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleTakePhoto = async () => {
    setShowAvatarOptions(false)

    // --- Actual camera access and photo capture logic (requires UI elements like <video> and <canvas>) ---
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Camera access not supported in this browser.")
      console.error("Camera access not supported")
      return
    }

    toast("Requesting camera access...")

    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })

      // --- Next Steps (Implement in your UI) ---
      // 1. Display the stream in a <video> element.
      //    const videoElement = document.querySelector('#camera-preview') // You need to add this video element
      //    if (videoElement instanceof HTMLVideoElement) { videoElement.srcObject = stream; }
      // 2. Add a button to trigger photo capture.
      // 3. On button click, draw the current video frame onto a <canvas> element.
      //    const canvas = document.createElement('canvas') // Or get a canvas element from your UI
      //    canvas.width = videoElement.videoWidth;
      //    canvas.height = videoElement.videoHeight;
      //    const context = canvas.getContext('2d');
      //    if (context) { context.drawImage(videoElement, 0, 0, canvas.width, canvas.height); }
      // 4. Convert the canvas content to a Blob or Data URL.
      //    canvas.toBlob(async (photoBlob) => { /* ... upload logic ... */ }, 'image/png');
      //    OR const dataUrl = canvas.toDataURL('image/png'); // Then convert Data URL to Blob for upload

      // --- For demonstration, we'll simulate getting a Blob and uploading ---
      // In a real flow, the photoBlob would come from the canvas.

      // Simulate creating a dummy blob (replace with actual blob from canvas)
      const dummyBlob = new Blob(['dummy image data'], { type: 'image/png' })
      const photoBlob = dummyBlob

      if (!photoBlob) {
          toast.error("Failed to capture photo.")
          console.error("Failed to get photo blob from camera.")
          // Stop the camera stream
          stream.getTracks().forEach(track => track.stop())
          return
      }

      // Upload the captured photo Blob
      const formData = new FormData()
      // Use a meaningful filename, e.g., based on timestamp or user ID
      formData.append('file', photoBlob, `avatar_${Date.now()}.png`)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      const uploadedImageUrl = result.url // Assuming your API returns the URL

      // Update Firebase Auth profile with the new photo URL
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: uploadedImageUrl,
        })
        // Update local state
        setProfile(prev => ({ ...prev, avatarUrl: uploadedImageUrl }))
        toast.success("Profile picture updated!")
      } else {
        toast.error("User not logged in.")
      }

      // Stop the camera stream after successful capture and upload
      stream.getTracks().forEach(track => track.stop())

    } catch (error: any) {
      console.error("Error accessing camera or uploading photo:", error)
      if (error.name === 'NotAllowedError') {
        toast.error("Camera access denied. Please allow camera permissions.")
      } else if (error.name === 'NotFoundError'){
        toast.error("No camera found on this device.")
      }
       else {
        toast.error(`Failed to update profile picture: ${error.message || 'Unknown error'}`)
      }
       // Ensure stream is stopped if an error occurs before stopping it explicitly
       if (error.message && error.message.includes('stream')) { // Simple check if stream was likely created
           try { const stream = await navigator.mediaDevices.getUserMedia({ video: true }); stream.getTracks().forEach(track => track.stop()); } catch (e) { console.error("Failed to stop stream after error", e) }
       }
    }
    // --- End of Camera Access and Capture Logic ---
  }

  const handleUploadPhoto = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click()
    setShowAvatarOptions(false)
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      const uploadedImageUrl = result.url

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: uploadedImageUrl,
        })
        setProfile(prev => ({ ...prev, avatarUrl: uploadedImageUrl }))
        toast.success("Profile picture updated!")
      } else {
        toast.error("User not logged in.")
      }

    } catch (error) {
      console.error("Upload or profile update failed:", error)
      toast.error("Failed to update profile picture.")
    } finally {
      event.target.value = '' // Reset file input
    }
  }

  const handleManageSessionsClick = () => {
    // Implement the logic to manage sessions
    console.log("Manage sessions clicked")
  }

  return (
    <>
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/desktop/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback className="text-lg">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Popover open={showAvatarOptions} onOpenChange={setShowAvatarOptions}>
                    <PopoverTrigger asChild>
                      <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2">
                      <div className="grid gap-2">
                        <Button variant="ghost" className="justify-start" onClick={handleTakePhoto}>
                          <Camera className="mr-2 h-4 w-4" />
                          Take Photo
                        </Button>
                        <Button variant="ghost" className="justify-start" onClick={handleUploadPhoto}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500">
                      <Crown className="h-3 w-3 mr-1" />
                      {profile.plan} Plan
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2">
                      <Input id="email" type="email" value={profile.email} disabled className="flex-1" />
                      <Button variant="outline" onClick={() => setIsChangingEmail(true)} className="whitespace-nowrap">
                        <Mail className="mr-2 h-4 w-4" />
                        Change Email
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Change your account password</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Change Email Modal */}
      {isChangingEmail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Change Email Address</CardTitle>
              <CardDescription>Enter your new email address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-email">Current Email</Label>
                <Input id="current-email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">New Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="Enter your new email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsChangingEmail(false)}>
                Cancel
              </Button>
              <Button onClick={handleEmailChange} disabled={!newEmail || newEmail === profile.email}>
                Update Email
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Enter your current password and a new password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
