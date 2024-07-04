import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter your username" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="notifications">Notifications</Label>
          <Input id="notifications" type="checkbox" />
        </div>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;