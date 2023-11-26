import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo, useState } from "react";
import { validateUser } from "../utils/validation";
import { useCreate } from "../services/hooks/useCreate";
import { useGet } from "../services/hooks/useGet";
import { useUpdate } from "../services/hooks/useUpdate";
import { useDelete } from "../services/hooks/useDelete";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import BugReportIcon from '@mui/icons-material/BugReport';
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";


function BugPage() {
  const [validationErrors, setValidationErrors] = useState({});

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

  const style = {};

  const initialInputValues = inputFields.reduce((acc, field) => {
    acc[field.stateVariable] = "";
    return acc;
  }, {});

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [editValues, setEditValues] = useState({});
  

  // const buttonName = "Add User";
  // const title = "Create User";
  // const actionLabel = "Add";

  const statusColors = {
    OPEN: "#4CAF50", // Green
    ASSIGNED: "#2196F3", // Blue
    IN_PROGRESS: "#FFC107", // Yellow/Orange
    IN_TEST: "#9C27B0", // Purple
    RESOLVED: "#009688", // Teal/Turquoise
    CLOSED: "#757575", // Gray
  };

  const severityColors = {
    LOW: "#4CAF50",       // Green
    MEDIUM: "#FFC107",    // Yellow/Orange
    HIGH: "#FF5722",      // Deep Orange
    CRITICAL: "red",  // Red
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
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.title,
        //   helperText: validationErrors?.title,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       firstName: undefined,
        //     }),
        //   //optionally add validation checking for onBlur or onChange
        // },
      },
      {
        accessorKey: "description",
        header: "Description",
        enableEditing: false,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.description,
        //   helperText: validationErrors?.description,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
      {
        accessorKey: "stepsToReproduce",
        header: "Steps To Reproduce",
        enableEditing: false,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
      {
        accessorKey: "environmentDetails",
        header: "Environment Details",
        enableEditing: false,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
      {
        accessorKey: "severity",
        header: "severity",
        editVariant: "select",
        editSelectOptions: severity,

        Cell: ({ cell }) => (
          // <Box
          //   component="span"
          //   sx={(theme) => ({
          //     backgroundColor:
          //       cell.getValue() < 50_000
          //         ? theme.palette.error.dark
          //         : cell.getValue() >= 50_000 && cell.getValue() < 75_000
          //         ? theme.palette.warning.dark
          //         : theme.palette.success.dark,
          //     borderRadius: '0.25rem',
          //     color: '#fff',
          //     maxWidth: '9ch',
          //     p: '0.25rem',
          //   })}
          // >
          //   {cell.getValue()?.toLocaleString?.('en-US', {
          //     style: 'currency',
          //     currency: 'USD',
          //     minimumFractionDigits: 0,
          //     maximumFractionDigits: 0,
          //   })}
          // </Box>

          <Box
            component="span"
            sx={(status) => ({
              backgroundColor: severityColors[cell.row._valuesCache.severity],
              borderRadius: "0.25rem",
              color: "",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
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
          // <Box
          //   component="span"
          //   sx={(theme) => ({
          //     backgroundColor:
          //       cell.getValue() < 50_000
          //         ? theme.palette.error.dark
          //         : cell.getValue() >= 50_000 && cell.getValue() < 75_000
          //         ? theme.palette.warning.dark
          //         : theme.palette.success.dark,
          //     borderRadius: '0.25rem',
          //     color: '#fff',
          //     maxWidth: '9ch',
          //     p: '0.25rem',
          //   })}
          // >
          //   {cell.getValue()?.toLocaleString?.('en-US', {
          //     style: 'currency',
          //     currency: 'USD',
          //     minimumFractionDigits: 0,
          //     maximumFractionDigits: 0,
          //   })}
          // </Box>

          <Box
            component="span"
            sx={(status) => ({
              backgroundColor: statusColors[cell.row._valuesCache.status],
              borderRadius: "0.25rem",
              color: "",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),

        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
      {
        accessorKey: "createdBy.fullName",
        header: "CreatedBy",
        enableEditing: false,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
      {
        accessorKey: "createdAt",
        header: "createdAt",
        enableEditing: false,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
      {
        accessorKey: "updatedAt",
        header: "updatedAt",
        enableEditing: false,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.email,
        //   helperText: validationErrors?.email,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       lastName: undefined,
        //     }),
        // },
      },
    ],
    [severity, severityColors, status, statusColors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreate("/api/v1/bug");
  //call READ hook
  const {
    data: fetchedUsers,
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGet("/api/v1/bugs");
  //call read hook of role api

  //call UPDATE hook
  const [bugId, setBugId] = useState(null);

  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdate(
    `/api/v1/bugs/${bugId}`
  );

  const { mutateAsync: closeBug, isPending: isClosingBug ,isError:isErrorClosingBug,isSuccess} = useUpdate(
    `/api/v1/bugs/${bugId}/close`
  );

  const { mutateAsync: reopen, isPending: isReOpeningBug } = useUpdate(
    `/api/v1/bugs/${bugId}/re-open`
  );

  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDelete();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }

    setValidationErrors({});

    const transformedData = {
      bugSeverity: values.severity,
      title: values.title,
      description: values.description,
      stepsToReproduce: values.stepsToReproduce,
      environmentDetails: values.environmentDetails,
    };
    await createUser(inputValues);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    setBugId(values?.bugId);

    const data = {
      severity: editValues?.bugSeverity,
    };

    await updateUser(data);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };



  

  const openCloseConfirmModal =async (row) => {
    if (window.confirm(`Are you sure you want to close bug issue with id of ${row.original.bugId}?`)) {
    setBugId(row.original.bugId); 
     await closeBug(); 
     
     
    }
  };
  

  const reOpenConfirmModal = async (row) => {
    if (window.confirm(`Are you sure you want to reopen bug issue with id of ${row.original.bugId}?`)) {
      setBugId(row.original.bugId); 
      await reopen();
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers || [],
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
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

    // enableColumnFilterModes: true,
    // enableColumnOrdering: true,
    // enableGrouping: true,
    // enableColumnPinning: true,
    // enableFacetedValues: true,
    // enableRowActions: true,
    // enableRowSelection: true,

    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New Bug</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* {internalEditComponents} or render custom edit components here */}
          <Box sx={style}>
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
            {/* <Typography variant="h6" component="h2">
            <p style={{ margin: "0px", color: "red" }}>
              {isError ? error.message : ""}
            </p>
          </Typography>
          <Typography variant="h6" component="h2">
            <p style={{ margin: "0px", color: "green" }}>
              {isSuccess ? "Successfully Added" : ""}
            </p>
          </Typography> */}

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
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Update Severity </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* {internalEditComponents} or render custom edit components here */}
          <>
            <InputLabel>Severity</InputLabel>
            <Select
              value={editValues}
              // onChange={(e) => {
              //   const newValue = e.target.value;
              //   setEditValues((prevValues) => ({
              //     ...prevValues,
              //     [severity.stateVariable]: newValue,
              //   }));
              // }}
              onChange={(e) => {
                const newValue = e.target.value;
                setEditValues((prevValues) => ({
                  ...prevValues,
                  [inputFields.find(
                    (field) => field.stateVariable === "bugSeverity"
                  )?.stateVariable]: newValue,
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
        <IconButton onClick={ () => reOpenConfirmModal(row) }>
            <BugReportIcon />
          
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip> */}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
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
    ),

    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
}

export default BugPage;
