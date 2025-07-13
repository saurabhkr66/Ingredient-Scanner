'use client';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, EllipsisVertical, EyeIcon, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUpdateReportMutation } from '@/hooks/react-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import Loading from '../common/Loading';

export default function Menu({
  tittle,
  id,
  hidden = true,
}: {
  tittle: string;
  id: string;
  hidden?: boolean;
}) {
  const { mutate, data, isPending, isSuccess, isError, error } = useUpdateReportMutation();
  const [open, setOpen] = useState(false);
  const [isHide, setIsHide] = useState(false); // true: hide/unhide, false: rename
  const [updateTittle, setUpdateTittle] = useState(tittle);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleHide() {
    mutate({ id, hidden: !hidden });
  }

  function handleRename() {
    mutate({ id, tittle: updateTittle });
  }

  useEffect(() => {
    if (data?.success) {
      toast('Successfully updated');
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (error) {
      toast((error as any).data.message ?? 'Internal server error');
    }
  }, [isError, error]);

  useEffect(() => {
    if (!isPending) {
      setDialogOpen(false);
    }
  }, [isPending]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setIsHide(false); // Open rename dialog
                setDialogOpen(true);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={hidden ? 'text-green-600' : 'text-red-600'}
              onClick={() => {
                setIsHide(true); // Open hide/unhide dialog
                setDialogOpen(true);
              }}
            >
              {hidden ? (
                <>
                  <EyeIcon className="mr-2 h-4 w-4" />
                  Unhide
                </>
              ) : (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog content based on action */}
      {isHide ? (
        <DialogContent>
          {isPending ? (
            <Loading />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  {hidden
                    ? 'This action will make the report visible again. Do you want to unhide it?'
                    : 'This action will hide the report from the list. Do you want to proceed?'}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleHide}>
                    {hidden ? 'Unhide' : 'Hide'}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      ) : (
        <DialogContent>
          {isPending ? (
            <Loading />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Edit title</DialogTitle>
                <DialogDescription>
                  Make changes here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label htmlFor="title" className="col-span-1 text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={updateTittle}
                    onChange={(e) => setUpdateTittle(e.currentTarget.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleRename}>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
