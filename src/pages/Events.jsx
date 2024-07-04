import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fetchEvents = async () => {
  // Replace with actual API call
  return [
    { id: 1, name: "Event 1", date: "2023-10-01", location: "Location 1", status: "Upcoming" },
    { id: 2, name: "Event 2", date: "2023-10-05", location: "Location 2", status: "Completed" },
  ];
};

const Events = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStatus, setEventStatus] = useState("");

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [numTickets, setNumTickets] = useState(1);

  const queryClient = useQueryClient();
  const createEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      toast("Event created successfully");
      setIsOpen(false);
      setEventName("");
      setEventDate("");
      setEventLocation("");
      setEventStatus("");
    },
    onError: () => {
      toast("Failed to create event");
    },
  });

  const bookTicketMutation = useMutation({
    mutationFn: async (bookingData) => {
      const response = await fetch("/api/book-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error("Failed to book ticket");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      toast("Ticket booked successfully");
      setBookingOpen(false);
      setUserName("");
      setUserEmail("");
      setNumTickets(1);
    },
    onError: () => {
      toast("Failed to book ticket");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createEventMutation.mutate({
      name: eventName,
      date: eventDate,
      location: eventLocation,
      status: eventStatus,
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    bookTicketMutation.mutate({
      eventId: selectedEvent.id,
      userName,
      userEmail,
      numTickets,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Events</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>Create Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventLocation">Event Location</Label>
                <Input
                  id="eventLocation"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventStatus">Event Status</Label>
                <Input
                  id="eventStatus"
                  value={eventStatus}
                  onChange={(e) => setEventStatus(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="ml-2">Delete</Button>
                <Button variant="outline" size="sm" className="ml-2" onClick={() => { setSelectedEvent(event); setBookingOpen(true); }}>Book Ticket</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Ticket for {selectedEvent?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="numTickets">Number of Tickets</Label>
              <Input
                id="numTickets"
                type="number"
                value={numTickets}
                onChange={(e) => setNumTickets(e.target.value)}
                min="1"
                required
              />
            </div>
            <Button type="submit">Book</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;