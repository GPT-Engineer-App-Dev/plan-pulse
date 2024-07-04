import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";

const fetchDashboardData = async () => {
  // Replace with actual API call
  return {
    upcomingEvents: 5,
    recentActivities: 10,
    keyMetrics: {
      totalEvents: 20,
      totalAttendees: 150,
    },
  };
};

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>{data.upcomingEvents}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>{data.recentActivities}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>{data.keyMetrics.totalEvents}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Attendees</CardTitle>
          </CardHeader>
          <CardContent>{data.keyMetrics.totalAttendees}</CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;