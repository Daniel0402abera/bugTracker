import React, { useMemo, useState } from "react";
import DevSelection from "../components/common/DevSelection";
import BugSelection from "../components/common/BugSelection";
import { useUpdate } from "../services/hooks/useUpdate";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useGet } from "../services/hooks/useGet";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
function AssignUser() {
  const [selectedDevId, setSelectedDevId] = useState(null);
  const [selectedBugeId, setSelectedBugId] = useState(null);

  const handleSelecteDevIdChange =  (newSelectedId) => {
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

  const {
    data: fetchedBugs,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGet("/api/v1/bugs");
  //call read hook of role api
  const filteredBugs = fetchedBugs?.filter((bug) =>
    bug?.hasOwnProperty("assignedUser")
  );

  const severity = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const status = [
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "IN_TEST",
    "RESOLVED",
    "CLOSED",
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statusColors = {
    OPEN: "#4CAF50", // Green
    ASSIGNED: "#2196F3", // Blue
    IN_PROGRESS: "#FFC107", // Yellow/Orange
    IN_TEST: "#9C27B0", // Purple
    RESOLVED: "#009688", // Teal/Turquoise
    CLOSED: "#757575", // Gray
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const severityColors = {
    LOW: "#4CAF50", // Green
    MEDIUM: "#FFC107", // Yellow/Orange
    HIGH: "#FF5722", // Deep Orange
    CRITICAL: "red", // Red
  };
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
  
    if (name === "undefined" || typeof name !== 'string' ) {
      return 'Name'; // Return an empty object or handle it in a way that makes sense for your application
    }else return {
      sx: {
        bgcolor: stringToColor(name),
      },
     children: `${name?.split(' ')[0][0]}`,
    };
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "bugId",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        enableEditing: false,
      },
      {
        accessorKey: "stepsToReproduce",
        header: "Steps To Reproduce",
        enableEditing: false,
      },
      {
        accessorKey: "environmentDetails",
        header: "Environment Details",
        enableEditing: false,
      },
      {
        accessorKey: "severity",
        header: "severity",
        editVariant: "select",
        editSelectOptions: severity,

        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              backgroundColor: severityColors[cell.row._valuesCache.severity],
              borderRadius: "0.25rem",
              color: "",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "",
              currency: "",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        editVariant: "select",
        editSelectOptions: status,
        enableEditing: false,

        size: 200,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={() => ({
              backgroundColor: statusColors[cell.row._valuesCache.status],
              borderRadius: "0.25rem",
              color: "",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "",
              currency: "",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        id: 'assignedUser.fullName',
        header: 'Assigned User',
        columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
        enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
        Cell: ({ row }) => (
          // <Button >{row?.original?.assignedUser.fullName}</Button>
          // <Avatar sx={{ bgcolor: deepOrange[500] }}>{row?.original?.assignedUser.fullName}</Avatar>
          <Avatar {...stringAvatar (`${row?.original?.assignedUser?.fullName}`)} />
        ),
      },
      {
        accessorKey: "createdBy.fullName",
        header: "CreatedBy",
        enableEditing: false,
      },
      
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredBugs || [],

    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },

    state: {
      isLoading: isLoadingUsers,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <Button
        variant="contained"
        style={{ marginTop: "25px", marginBottom: "25px" }}
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
      <Typography style={{display:'flex', justifyContent:'center' ,color:'Green' ,marginTop:'10px'}} variant="h6" component="h5">List of Assigned Bug and Status</Typography>
      <MaterialReactTable table={table} />
    </>
  );
}

export default AssignUser;
