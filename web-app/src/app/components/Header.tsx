"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";

import HotelIcon from "@mui/icons-material/Hotel";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/UserStore";

export default function Header() {
  const userStore = useUserStore();
  const user = userStore.currentUser;
  const path = usePathname();
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Link href={"/"}>
          <Typography
            level="h1"
            color="neutral"
            fontFamily={"Great Vibes"}
            fontWeight={400}
            padding={"10px"}
          >
            Hotel Opulence
          </Typography>
        </Link>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          aria-pressed={path.startsWith("/rooms")}
          href="/rooms"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Standard Booking
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          aria-pressed={path.startsWith("/packages")}
          href="/packages"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Deals and Packages
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed={path.startsWith("/about")}
          component="a"
          href="/about"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          About Us
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed={path.startsWith("/contact")}
          component="a"
          href="/contact"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Contact
        </Button>
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton variant="plain" color="neutral">
          <MenuRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src={user?.photoURL || "https://i.pravatar.cc/40?img=2"}
              srcSet={user?.photoURL || "https://i.pravatar.cc/80?img=2"}
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            {user ? (
              <>
                <MenuItem>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={user.photoURL || "https://i.pravatar.cc/40?img=2"}
                      srcSet={user.photoURL || "https://i.pravatar.cc/80?img=2"}
                      sx={{ borderRadius: "50%" }}
                    />
                    <Box sx={{ ml: 1.5 }}>
                      <Typography level="title-sm" textColor="text.primary">
                        {user.displayName}
                      </Typography>
                      <Typography level="body-xs" textColor="text.tertiary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <ListDivider />
                <Link href={"/bookings"}>
                  <MenuItem>
                    <HotelIcon />
                    Bookings
                  </MenuItem>
                </Link>
                <Link href={"/profile"}>
                  <MenuItem>
                    <AccountBoxIcon />
                    My Profile
                  </MenuItem>
                </Link>
                <ListDivider />
                <MenuItem onClick={() => userStore.signOut()}>
                  <LogoutRoundedIcon />
                  Log out
                </MenuItem>
              </>
            ) : (
              <Link href={"/log-in"}>
                <MenuItem>
                  <AccountBoxIcon />
                  Log in
                </MenuItem>
              </Link>
            )}
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
