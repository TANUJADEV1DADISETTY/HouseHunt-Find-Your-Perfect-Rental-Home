"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Home, TrendingUp, AlertTriangle, Check, X, Eye, Search, Shield, Activity } from "lucide-react"

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Renter",
    status: "Active",
    joinDate: "2024-01-15",
    properties: 0,
    applications: 3,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Owner",
    status: "Pending",
    joinDate: "2024-01-12",
    properties: 3,
    applications: 0,
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "Owner",
    status: "Active",
    joinDate: "2024-01-10",
    properties: 2,
    applications: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Renter",
    status: "Active",
    joinDate: "2024-01-08",
    properties: 0,
    applications: 1,
  },
]

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    owner: "Sarah Johnson",
    location: "Downtown, New York",
    price: 2500,
    status: "Active",
    views: 156,
    inquiries: 12,
  },
  {
    id: 2,
    title: "Cozy Family House",
    owner: "Mike Wilson",
    location: "Suburbs, California",
    price: 3200,
    status: "Rented",
    views: 89,
    inquiries: 8,
  },
]

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [userFilter, setUserFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handleApproveUser = (userId: number) => {
    console.log("Approving user:", userId)
    // Handle user approval
  }

  const handleRejectUser = (userId: number) => {
    console.log("Rejecting user:", userId)
    // Handle user rejection
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = userFilter === "all" || user.role.toLowerCase() === userFilter
    return matchesSearch && matchesFilter
  })

  const stats = [
    {
      title: "Total Users",
      value: mockUsers.length,
      icon: Users,
      color: "text-blue-600",
      change: "+12%",
    },
    {
      title: "Active Properties",
      value: mockProperties.filter((p) => p.status === "Active").length,
      icon: Home,
      color: "text-green-600",
      change: "+8%",
    },
    {
      title: "Pending Approvals",
      value: mockUsers.filter((u) => u.status === "Pending").length,
      icon: AlertTriangle,
      color: "text-yellow-600",
      change: "-5%",
    },
    {
      title: "Platform Revenue",
      value: "$12,450",
      icon: TrendingUp,
      color: "text-purple-600",
      change: "+15%",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, properties, and platform activity</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Activity Log
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user registrations and approvals</CardDescription>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="renter">Renters</SelectItem>
                    <SelectItem value="owner">Owners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "Active" ? "default" : "secondary"}
                          className={user.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>User Details</DialogTitle>
                                <DialogDescription>View and manage user information</DialogDescription>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Name</label>
                                      <p>{selectedUser.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Email</label>
                                      <p>{selectedUser.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Role</label>
                                      <p>{selectedUser.role}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <p>{selectedUser.status}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Properties</label>
                                      <p>{selectedUser.properties}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Applications</label>
                                      <p>{selectedUser.applications}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline">Close</Button>
                                {selectedUser?.status === "Pending" && (
                                  <>
                                    <Button variant="destructive" onClick={() => handleRejectUser(selectedUser.id)}>
                                      Reject
                                    </Button>
                                    <Button onClick={() => handleApproveUser(selectedUser.id)}>Approve</Button>
                                  </>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {user.status === "Pending" && (
                            <>
                              <Button variant="ghost" size="icon" onClick={() => handleApproveUser(user.id)}>
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleRejectUser(user.id)}>
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Bulk User Actions
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Home className="h-4 w-4 mr-2" />
                Property Reports
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics Dashboard
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                System Alerts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p>New owner registration</p>
                  <p className="text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p>Property listing approved</p>
                  <p className="text-gray-600">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p>User reported issue</p>
                  <p className="text-gray-600">3 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
