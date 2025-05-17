
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { BloodRequest, BloodType, RequestStatus, UserRole, UrgencyLevel } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  ArrowUpDown,
  Heart,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Requests: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<BloodRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    urgency: [] as UrgencyLevel[],
    bloodType: [] as BloodType[],
    status: [] as RequestStatus[],
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await api.getBloodRequests();
        
        // Filter based on user role
        let userRequests = requests;
        if (user?.role === UserRole.REQUESTER) {
          userRequests = requests.filter(request => request.requesterId === user.id);
        }
        
        setBloodRequests(userRequests);
        setFilteredRequests(userRequests);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  useEffect(() => {
    // Apply filters and search
    let results = bloodRequests;
    
    // Apply search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        (request) =>
          request.requesterName.toLowerCase().includes(lowerSearchTerm) ||
          request.bloodType.toLowerCase().includes(lowerSearchTerm) ||
          request.location.city?.toLowerCase().includes(lowerSearchTerm) ||
          request.location.state?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply urgency filter
    if (filters.urgency.length > 0) {
      results = results.filter(request => 
        filters.urgency.includes(request.urgency as UrgencyLevel)
      );
    }
    
    // Apply blood type filter
    if (filters.bloodType.length > 0) {
      results = results.filter(request => 
        filters.bloodType.includes(request.bloodType)
      );
    }
    
    // Apply status filter
    if (filters.status.length > 0) {
      results = results.filter(request => 
        filters.status.includes(request.status)
      );
    }
    
    setFilteredRequests(results);
  }, [searchTerm, filters, bloodRequests]);

  const toggleUrgencyFilter = (urgency: UrgencyLevel) => {
    setFilters(prevFilters => {
      if (prevFilters.urgency.includes(urgency)) {
        return {
          ...prevFilters,
          urgency: prevFilters.urgency.filter(u => u !== urgency)
        };
      } else {
        return {
          ...prevFilters,
          urgency: [...prevFilters.urgency, urgency]
        };
      }
    });
  };

  const toggleBloodTypeFilter = (bloodType: BloodType) => {
    setFilters(prevFilters => {
      if (prevFilters.bloodType.includes(bloodType)) {
        return {
          ...prevFilters,
          bloodType: prevFilters.bloodType.filter(b => b !== bloodType)
        };
      } else {
        return {
          ...prevFilters,
          bloodType: [...prevFilters.bloodType, bloodType]
        };
      }
    });
  };

  const toggleStatusFilter = (status: RequestStatus) => {
    setFilters(prevFilters => {
      if (prevFilters.status.includes(status)) {
        return {
          ...prevFilters,
          status: prevFilters.status.filter(s => s !== status)
        };
      } else {
        return {
          ...prevFilters,
          status: [...prevFilters.status, status]
        };
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getUrgencyColor = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case UrgencyLevel.CRITICAL:
        return "bg-red-100 text-red-800";
      case UrgencyLevel.HIGH:
        return "bg-orange-100 text-orange-800";
      case UrgencyLevel.MEDIUM:
        return "bg-yellow-100 text-yellow-800";
      case UrgencyLevel.LOW:
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.PENDING:
        return "bg-orange-100 text-orange-800";
      case RequestStatus.MATCHED:
        return "bg-blue-100 text-blue-800";
      case RequestStatus.SCHEDULED:
        return "bg-purple-100 text-purple-800";
      case RequestStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case RequestStatus.CANCELLED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-primary border-r-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blood Requests</h1>
          <p className="text-muted-foreground">
            {user?.role === UserRole.REQUESTER
              ? "Manage your blood requests"
              : user?.role === UserRole.DONOR
              ? "Find opportunities to donate"
              : "Overview of all blood requests"}
          </p>
        </div>
        
        {user?.role === UserRole.REQUESTER && (
          <Button 
            className="bg-blood-600 hover:bg-blood-700"
            onClick={() => navigate("/requests/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <h4 className="font-medium mb-2">Urgency</h4>
                  <div className="flex flex-wrap gap-1">
                    {Object.values(UrgencyLevel).map((urgency) => (
                      <Badge
                        key={urgency}
                        variant="outline"
                        className={cn(
                          "cursor-pointer",
                          filters.urgency.includes(urgency) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleUrgencyFilter(urgency)}
                      >
                        {urgency}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-2 border-t">
                  <h4 className="font-medium mb-2">Blood Type</h4>
                  <div className="flex flex-wrap gap-1">
                    {Object.values(BloodType).map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className={cn(
                          "cursor-pointer",
                          filters.bloodType.includes(type) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleBloodTypeFilter(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-2 border-t">
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="flex flex-wrap gap-1">
                    {Object.values(RequestStatus).map((status) => (
                      <Badge
                        key={status}
                        variant="outline"
                        className={cn(
                          "cursor-pointer",
                          filters.status.includes(status) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleStatusFilter(status)}
                      >
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      {filteredRequests.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Urgency</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Badge
                        className={cn(getUrgencyColor(request.urgency as UrgencyLevel))}
                      >
                        {request.urgency === UrgencyLevel.CRITICAL && (
                          <AlertTriangle className="mr-1 h-3 w-3 inline" />
                        )}
                        {request.urgency.charAt(0).toUpperCase() +
                          request.urgency.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-blood-500" />
                        <span className="font-medium">{request.bloodType}</span>
                      </div>
                    </TableCell>
                    <TableCell>{request.requesterName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                        {request.location.city}, {request.location.state}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getStatusColor(request.status))}>
                        {request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => navigate(`/requests/${request.id}`)}
                          >
                            View Details
                          </DropdownMenuItem>
                          {user?.role === UserRole.DONOR && request.status === "pending" && (
                            <DropdownMenuItem>Respond to Request</DropdownMenuItem>
                          )}
                          {user?.role === UserRole.REQUESTER && (
                            <>
                              {request.status === "pending" && (
                                <DropdownMenuItem>Edit Request</DropdownMenuItem>
                              )}
                              {["pending", "matched"].includes(request.status) && (
                                <DropdownMenuItem>Cancel Request</DropdownMenuItem>
                              )}
                            </>
                          )}
                          {user?.role === UserRole.ADMIN && (
                            <DropdownMenuItem>Manage Request</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No requests found</h3>
            <p className="mt-2 text-sm text-muted-foreground text-center max-w-sm">
              {searchTerm || Object.values(filters).some(f => f.length > 0)
                ? "Try changing your search or filter criteria."
                : user?.role === UserRole.REQUESTER
                ? "You haven't created any blood requests yet."
                : "There are no blood requests at the moment."}
            </p>
            {user?.role === UserRole.REQUESTER && (
              <Button 
                className="mt-6 bg-blood-600 hover:bg-blood-700"
                onClick={() => navigate("/requests/new")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Request
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Requests;
