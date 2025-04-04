import { Pagination as PaginationMui } from "@mui/material";
const Pagination = ({
  totalPages,
  page,
  onChange,
}: {
  totalPages: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) => {
  return (
    <div className="flex justify-center mb-4 mt-8">
      <PaginationMui count={totalPages} page={page || 1} onChange={onChange} />
    </div>
  );
};

export default Pagination;
