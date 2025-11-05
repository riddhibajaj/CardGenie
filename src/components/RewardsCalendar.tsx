import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar as CalendarIcon, Percent, Gift, Clock, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, isSameDay, parseISO } from "date-fns";
import { mockCalendarEvents, CalendarEvent } from "@/data/mockData";

const RewardsCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'bonus':
        return <Percent className="h-5 w-5" />;
      case 'expiration':
        return <Clock className="h-5 w-5" />;
      case 'promotion':
        return <Gift className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'bonus':
        return 'bg-accent text-accent-foreground';
      case 'expiration':
        return 'bg-destructive text-destructive-foreground';
      case 'promotion':
        return 'bg-success text-success-foreground';
    }
  };

  const getEventBorderColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'bonus':
        return 'border-accent';
      case 'expiration':
        return 'border-destructive';
      case 'promotion':
        return 'border-success';
    }
  };

  const filterEventsByType = (type?: CalendarEvent['type']) => {
    if (!type) return mockCalendarEvents;
    return mockCalendarEvents.filter(event => event.type === type);
  };

  const getEventsForDate = (date: Date | undefined, type?: CalendarEvent['type']) => {
    if (!date) return [];
    const events = filterEventsByType(type);
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const upcomingEvents = mockCalendarEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getDatesWithEvents = (type?: CalendarEvent['type']) => {
    const events = filterEventsByType(type);
    return events.map(event => parseISO(event.date));
  };

  const modifiers = {
    hasEvent: getDatesWithEvents(),
  };

  const modifiersStyles = {
    hasEvent: {
      backgroundColor: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
      fontWeight: 'bold',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Rewards Calendar</h1>
                <p className="text-sm text-muted-foreground">Track bonus categories, expirations & promotions</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
                <CardDescription>Click on a date to view events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                />
              </CardContent>
            </Card>

            {/* Events for Selected Date */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle>Events on {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                  <CardDescription>
                    {getEventsForDate(selectedDate).length} event(s) scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No events scheduled for this date
                    </p>
                  ) : (
                    getEventsForDate(selectedDate).map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg border-2 ${getEventBorderColor(event.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold">{event.title}</h4>
                              <Badge className={getEventColor(event.type)}>
                                {event.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-medium">{event.cardName}</span>
                              {event.value && (
                                <span className="text-muted-foreground">
                                  Value: {formatCurrency(event.value)}
                                </span>
                              )}
                            </div>
                            {event.notificationEnabled && (
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <Bell className="h-3 w-3" />
                                Notification enabled
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 5 events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedDate(parseISO(event.date))}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`p-1.5 rounded ${getEventColor(event.type)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(event.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.cardName}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Event Types Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                  <div className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-accent" />
                    <span className="font-medium">Bonus Categories</span>
                  </div>
                  <Badge variant="secondary">
                    {mockCalendarEvents.filter(e => e.type === 'bonus').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-destructive" />
                    <span className="font-medium">Expirations</span>
                  </div>
                  <Badge variant="secondary">
                    {mockCalendarEvents.filter(e => e.type === 'expiration').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-success" />
                    <span className="font-medium">Promotions</span>
                  </div>
                  <Badge variant="secondary">
                    {mockCalendarEvents.filter(e => e.type === 'promotion').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gradient-accent text-white border-0">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription className="text-white/80">
                  Get alerts for important events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white text-primary hover:bg-gray-100">
                  <Bell className="mr-2 h-4 w-4" />
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RewardsCalendar;