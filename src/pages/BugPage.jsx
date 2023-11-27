/* eslint-disable no-unused-vars */
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo, useState } from "react";
import { useCreate } from "../services/hooks/useCreate";
import { useGet } from "../services/hooks/useGet";
import { useUpdate } from "../services/hooks/useUpdate";
import { useDelete } from "../services/hooks/useDelete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import BugReportIcon from "@mui/icons-material/BugReport";

function BugPage() {
  const [validationErrors, setValidationErrors] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const severity = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

  const inputFields = [
    { label: "Title", stateVariable: "title" },
    { label: "Steps To Reproduce", stateVariable: "stepsToReproduce" },
    { label: "Environment Details", stateVariable: "environmentDetails" },
    { label: "Description", stateVariable: "description" },
    {
      type: "select",
      label: "Severity",
      stateVariable: "bugSeverity",
      options: severity,
    },
  ];

  const initialInputValues = inputFields.reduce((acc, field) => {
    acc[field.stateVariable] = "";
    return acc;
  }, {});

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [bugId, setBugId] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedBugStatus, setSelectedBugStatus] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const status = [
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "IN_TEST",
    "RESOLVED",
    "CLOSED",
  ];

  const handleSeverityChange = (e) => {
    const newValue = e.target.value;
    setSelectedSeverity(newValue);
  };

  const { mutateAsync: updateBugStatus, isPending: isUpdatingBugStatus } =
    useUpdate(`/api/v1/bugs/${bugId}/update-status?status=${selectedBugStatus}`, [
      "status",
    ]);


  const handleBUgStatusValueChange = async (e) => {
    const newValue = e.target.value;
    setSelectedBugStatus(newValue);
  
  };

  const handleBUgStatusChange = async () => {

    await updateBugStatus()
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInputValues(initialInputValues);
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid whiteSmoke",
    boxShadow: 24,
    p: 4,
  };

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
        accessorKey: "createdBy.fullName",
        header: "CreatedBy",
        enableEditing: false,
      },
      {
        accessorKey: "createdAt",
        header: "createdAt",
        enableEditing: false,
      },
      {
        accessorKey: "updatedAt",
        header: "updatedAt",
        enableEditing: false,
      },
    ],
    [severity, severityColors, status, statusColors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreate("/api/v1/bugs");
  //call READ hook
  const {
    data: fetchedBugs,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGet("/api/v1/bugs");
  //call read hook of role api
  const filteredBugs = fetchedBugs?.filter(bug => bug.hasOwnProperty('assignedUser'));
  console.log(fetchedBugs)
  console.log(filteredBugs);
  //call UPDATE hook

  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(
    `/api/v1/bugs/${bugId}`,
    ["user"]
  );

  const { mutateAsync: closeBug, isSuccess } = useUpdate(
    `/api/v1/bugs/${bugId}/close`,
    ["close"]
  );

  const { mutateAsync: reopen } = useUpdate(`/api/v1/bugs/${bugId}/re-open`, [
    "reopen",
  ]);

  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDelete();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    setValidationErrors({});

    await createUser(inputValues);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    setBugId(values?.bugId);

    const data = {
      severity: selectedSeverity,
    };

    await updateUser(data);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action

  const openCloseConfirmModal = async (row) => {
    if (
      window.confirm(
        `Are you sure you want to close bug issue with id of ${row.original.bugId}?`
      )
    ) {
      setBugId(row.original.bugId);
      await closeBug();
    }
  };

  const reOpenConfirmModal = async (row) => {
    if (
      window.confirm(
        `Are you sure you want to reopen bug issue with id of ${row.original.bugId}?`
      )
    ) {
      setBugId(row.original.bugId);
      await reopen();
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedBugs || [],
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,

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

    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row }) => (
      <>
        <DialogTitle variant="h5">Create New Bug</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Box>
            {inputFields.map((field, index) => (
              <div key={index}>
                {field.type === "date" && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {field.label}
                  </Typography>
                )}

                {field.type === "select" ? (
                  <>
                    <InputLabel>{field?.label}</InputLabel>
                    <Select
                      value={inputValues[field.stateVariable]}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setInputValues((prevValues) => ({
                          ...prevValues,
                          [field.stateVariable]: newValue,
                        }));
                      }}
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      {severity?.map((option, optionIndex) => (
                        <MenuItem key={optionIndex} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <TextField
                    label={field.type !== "date" ? field.label : ""}
                    value={inputValues[field.stateVariable]}
                    type={field.type || "text"}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        [field.stateVariable]: newValue,
                      }));
                    }}
                    fullWidth
                    sx={{ mt: field.type !== "date" ? 2 : 0 }}
                  />
                )}
              </div>
            ))}

            <Typography variant="h6" component="h2"></Typography>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
            ></Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row }) => (
      <>
        <DialogTitle variant="h5">Update Severity </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <>
            <InputLabel>Severity</InputLabel>
            <Select
              value={selectedSeverity}
              onChange={handleSeverityChange}
              fullWidth
              sx={{ mt: 2 }}
            >
              {severity?.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Close Bug">
          <IconButton onClick={() => openCloseConfirmModal(row)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="ReOpen Bug">
          <IconButton onClick={() => reOpenConfirmModal(row)}>
            <BugReportIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="update">
          <IconButton
            color="error"
            onClick={() => {
              handleOpen();
              setBugId(row.original.bugId);
            }}
          >
            <UpdateIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true); //simplest way to open the create row modal with no default values
            //or you can pass in a row object to set default values with the `createRow` helper function
            // table.setCreatingRow(
            //   createRow(table, {
            //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
            //   }),
            // );
          }}
        >
          Create New Bug
        </Button>
      </>
    ),

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Update Status of Bug
          </Typography>

          <>
            <InputLabel></InputLabel>
            <Select
              value={selectedBugStatus}
              onChange={handleBUgStatusValueChange}
              fullWidth
              sx={{ mt: 2 }}
            >
              {status?.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>

          <Typography variant="h6" component="h2"></Typography>
          <Typography variant="h6" component="h2">
            <p style={{ margin: "0px", color: "green" }}>
              {isSuccess ? "Successfully Added" : ""}
            </p>
          </Typography>

          <Typography variant="h6" component="h2"></Typography>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            {isUpdatingBugStatus ? (
              <Button variant="contained" color="primary" onClick={""}>
                Updating...
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBUgStatusChange}
              >
                Update status
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      <MaterialReactTable table={table} />
    </>
  );
}

export default BugPage;
