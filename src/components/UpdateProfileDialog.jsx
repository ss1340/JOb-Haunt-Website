import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import axios from "axios";

function UpdateProfileDialog({ open, setOpen }) {
  const { loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${USER_API_ENDPOINT}/update/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      setOpen(false);
      dispatch(setLoading(false));
      console.log(input);
    }
  };
  return (
    <div>
      <Dialog open={open} className="sm:max-w-[425px]">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Fill in the fields below to update your profile.
            </DialogDescription>
            <Button
              className="absolute top-4 right-6 icon-button"
              onClick={() => setOpen(false)}
              type="button"
              variant="outline"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4 grid-cols-4 ">
                <Label htmlFor="name" className="text-right">
                  Name:
                </Label>
                <Input
                  id="name"
                  name="fullname"
                  type="text"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid items-center gap-4 grid-cols-4 ">
                <Label htmlFor="email" className="text-right">
                  Email:
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid items-center gap-4 grid-cols-4 ">
                <Label htmlFor="number" className="text-right">
                  Number:
                </Label>
                <Input
                  id="number"
                  type="tel"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  name="phoneNumber"
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid items-center gap-4 grid-cols-4 ">
                <Label htmlFor="bio" className="text-right">
                  Bio:
                </Label>
                <Input
                  id="bio"
                  type="text"
                  onChange={changeEventHandler}
                  value={input.bio}
                  name="bio"
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid items-center gap-4 grid-cols-4 ">
                <Label htmlFor="skills" className="text-right">
                  Skills:
                </Label>
                <Input
                  id="skills"
                  type="text"
                  onChange={changeEventHandler}
                  value={input.skills}
                  name="skills"
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid items-center gap-4 grid-cols-4 ">
                <Label htmlFor="file" className="text-right">
                  Resume:
                </Label>
                <Input
                  id="file"
                  type="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  name="file"
                  className="col-span-3"
                ></Input>
              </div>
            </div>
            <DialogFooter>
              {" "}
              {loading ? (
                <Button className="w-full my-4 bg-[#f55d27]">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Please Wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#f55d27]">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
