"use client";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { debounce } from "lodash";
import CircularProgress from "@mui/material/CircularProgress";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Home() {
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messageBeforeRequest = React.useRef("");

  const onSetSubject: SelectProps<string>["onChange"] = (event) => {
    setSubject(event.target.value);
  };

  const autoSelectSubject = React.useMemo(() => {
    const handler = async (messagee: string) => {
      messageBeforeRequest.current = messagee;
      setLoading(true);
      // Call the server API to get the suggested subject.
      try {
        const res = await fetch(
          `/api/get-subject?message=${encodeURIComponent(messagee)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (
          data?.subject &&
          data.subject !== subject &&
          messageBeforeRequest.current === messagee
        ) {
          setSubject(data.subject);
        }
      } catch (err) {
        console.error("autoSelect fetch error", err);
      }
      setLoading(false);
    };

    return debounce(handler, 1000);
  }, [subject]);

  React.useEffect(() => {
    if (subject === "ai" && message.length > 5) {
      autoSelectSubject(message);
    }
  }, [subject, message, autoSelectSubject]);

  React.useEffect(() => {
    return () => {
      autoSelectSubject.cancel?.();
    };
  }, [autoSelectSubject]);

  return (
    <Box maxWidth={600} mx="auto" my={4} px={2}>
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            defaultValue="John"
            autoComplete="first name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            defaultValue="Snow"
            autoComplete="last name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="subject-select">Subject</InputLabel>
            <Select
              aria-placeholder="Select subject"
              name="subject"
              labelId="demo-simple-select-label"
              id="subject-select"
              label="Subject"
              value={subject}
              onChange={onSetSubject}
            >
              <MenuItem value={"ai"}>Automatic subject select 💎✨</MenuItem>
              <MenuItem value={"upload"}>
                Secure upload of signed documents
              </MenuItem>
              <MenuItem value={"other-questions"}>Other questions</MenuItem>
              <MenuItem value={"mastercard-docs"}>
                MasterCard Corporate documents
              </MenuItem>
              <MenuItem value={"entry-info"}>Entry information</MenuItem>
              <MenuItem value={"tech-qa-direct"}>
                Technical questions for Support Direct
              </MenuItem>
              <MenuItem value={"intl-support"}>
                International Customer Support
              </MenuItem>
            </Select>
          </FormControl>
        </FormGrid>
        {loading && <CircularProgress />}
        <FormGrid size={{ xs: 12 }}>
          <TextareaAutosize
            id="message"
            minRows={5}
            placeholder="Your message"
            aria-label="Message text input"
            autoFocus
            value={message}
            onChange={(e) =>
              setMessage((e.target as HTMLTextAreaElement).value)
            }
            style={{ fontSize: 16 }}
          />
        </FormGrid>
      </Grid>
    </Box>
  );
}
