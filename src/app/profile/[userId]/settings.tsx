import { Button } from "@/components/ui/button";
import DeleteProgress from "./deleteProgress";

export function Settings() {
    return <div className="mt-10">
        <h3 className="text-xl font-bold">Settings</h3>
        <div className="mt-5">
            <DeleteProgress />
        </div>
    </div>
}
