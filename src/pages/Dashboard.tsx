import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/lib/AuthContext"
import { supabase } from "@/lib/supabase"
import { useCompetitions } from "@/hooks/useSupabaseQuery"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface PlayerProfile {
  player_id: string
  first_name: string | null
  last_name: string | null
  skill_level: string | null
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const { data: competitions, isLoading: loadingCompetitions } = useCompetitions()

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate("/login")
      return
    }

    // Fetch player profile
    const fetchPlayerProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("players")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error) throw error
        setPlayerProfile(data)
      } catch (error) {
        console.error("Error fetching player profile:", error)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchPlayerProfile()
  }, [user, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate("/login")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Map the format to a more readable name and badge color
  const getFormatBadge = (format: string) => {
    const formatMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" | null }> = {
      "SINGLE_ELIM": { label: "Single Elimination", variant: "default" },
      "DOUBLE_ELIM": { label: "Double Elimination", variant: "secondary" },
      "POOL_PLAY": { label: "Pool Play", variant: "outline" },
      "ROTATING_PAIRS": { label: "Rotating Pairs", variant: null }
    }

    const formatInfo = formatMap[format] || { label: format, variant: null }
    
    return (
      <Badge variant={formatInfo.variant || "default"}>
        {formatInfo.label}
      </Badge>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Your volleyball player details</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingProfile ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ) : playerProfile ? (
              <div className="space-y-2">
                <p><span className="font-semibold">Name:</span> {playerProfile.first_name} {playerProfile.last_name}</p>
                <p><span className="font-semibold">Email:</span> {user?.email}</p>
                <p>
                  <span className="font-semibold">Skill Level:</span>{" "}
                  {playerProfile.skill_level ? (
                    <Badge variant="outline" className="capitalize">
                      {playerProfile.skill_level}
                    </Badge>
                  ) : (
                    "Not specified"
                  )}
                </p>
              </div>
            ) : (
              <p>No profile found. Please contact an administrator.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/profile")}>
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Competitions Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Competitions</CardTitle>
            <CardDescription>Volleyball tournaments you can join</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingCompetitions ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : competitions && competitions.length > 0 ? (
              <div className="space-y-4">
                {competitions.map((competition) => (
                  <div key={competition.competition_id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{competition.name}</h3>
                        <p className="text-sm text-gray-500">{formatDate(competition.start_date)}</p>
                        {competition.location && (
                          <p className="text-sm text-gray-500">{competition.location}</p>
                        )}
                      </div>
                      <div>{getFormatBadge(competition.format)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No competitions available at this time.</p>
            )}
          </CardContent>
          {competitions && competitions.length > 0 && (
            <CardFooter>
              <Button className="w-full" onClick={() => navigate("/competitions")}>
                View All Competitions
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
} 