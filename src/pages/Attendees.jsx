import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

const fetchAttendees = async () => {
  // Replace with actual API call
  return [
    { id: 1, name: "John Doe", email: "john@example.com", event: "Event 1" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", event: "Event 2" },
  ];
};

const Attendees = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["attendees"],
    queryFn: fetchAttendees,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Attendees</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>{attendee.name}</TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell>{attendee.event}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="ml-2">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Attendees;