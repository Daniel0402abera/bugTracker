import React, { useState } from "react";
import DevSelection from "../components/common/DevSelection";
import BugSelection from "../components/common/BugSelection";
import { useUpdate } from "../services/hooks/useUpdate";
import { Button } from "@mui/material";
function AssignUser() {
  const [selectedDevId, setSelectedDevId] = useState(null);
  const [selectedBugeId, setSelectedBugId] = useState(null);

  const handleSelecteDevIdChange = async (newSelectedId) => {
    setSelectedDevId(newSelectedId);
  };
  const handleSelectedBugIdChange = async (newSelectedId) => {
    setSelectedBugId(newSelectedId);
  };

  const { mutateAsync: AssignDev, isPending: isPendingAssign } = useUpdate(
    `/api/v1/bugs/${selectedBugeId}/assign/${selectedDevId}`,
    ["Assign"]
  );

  const handleAssign = async () => {
    await AssignDev();
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ marginTop:"25px",marginBottom: "25px" }}
        onClick={() => {
          handleAssign();
        }}
      >
        {isPendingAssign ? "Assigning..." : "Assign Dev To Fix The Bug"}
      </Button>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <DevSelection onSelectedDevChange={handleSelecteDevIdChange} />
        </div>
        <div style={{ width: "45%" }}>
          <BugSelection onSelectedBugChange={handleSelectedBugIdChange} />
        </div>
      </div>
    </>
  );
}

export default AssignUser;
