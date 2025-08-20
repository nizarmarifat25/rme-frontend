import { SIZE_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";

interface PropsTypes {
  buttonTopContent?: string;
  columns: { name: string; uid: string }[];
  currentPage: number;
  currentKeyword: string;
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  size: string;
  onClearKeyword: () => void;
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSize: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onClickButtonTopContent?: () => void;
  totalPage: number;
  renderCell: (item: Record<string, unknown>, columnKey: string) => ReactNode;
}

const DataTable = (props: PropsTypes) => {
  const {
    buttonTopContent,
    columns,
    currentPage,
    currentKeyword,
    data,
    emptyContent,
    isLoading,
    size,
    renderCell,
    onClearKeyword,
    onChangeKeyword,
    onChangeSize,
    onChangePage,
    onClickButtonTopContent,
    totalPage,
  } = props;

  const { data: session } = useSession();

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 px-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[25%]"
          placeholder="Cari Nama"
          aria-label="Cari Nama"
          startContent={<CiSearch aria-hidden="true" />}
          onClear={() => onClearKeyword()}
          onChange={(e) => onChangeKeyword(e)}
          defaultValue={currentKeyword || ""}
        />
        {buttonTopContent &&
          (session?.user?.role == "admin" ||
            session?.user?.role == "owner") && (
            <Button
              color="success"
              className="text-white"
              aria-label={buttonTopContent || "Tambah Data"}
              onPress={onClickButtonTopContent}
            >
              <IoIosAdd className="text-lg" /> {buttonTopContent}
            </Button>
          )}
      </div>
    );
  }, [
    buttonTopContent,
    onChangeKeyword,
    onClearKeyword,
    onClickButtonTopContent,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center gap-x-2 px-2 py-2 lg:justify-end">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[size]}
          selectionMode="single"
          onChange={onChangeSize}
          aria-label="Pilih jumlah data per halaman"
          disallowEmptySelection
          startContent={<p className="text-small">Tampil:</p>}
        >
          {SIZE_LISTS.map((size) => (
            <SelectItem key={size.value}>{size.label}</SelectItem>
          ))}
        </Select>

        {totalPage > 1 && (
          <Pagination
            isCompact
            showControls
            color="success"
            aria-label="Navigasi Halaman"
            className="nextui-pagination"
            page={currentPage}
            total={totalPage}
            onChange={onChangePage}
          />
        )}
      </div>
    );
  }, [size, currentPage, totalPage, onChangeSize, onChangePage]);

  return (
    <Table
      aria-label="Tabel Data"
      topContent={topContent}
      bottomContent={bottomContent}
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      shadow="none"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader className="bg-green-400">
        {columns.map((column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        ))}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/5">
            <Spinner color="success" />
          </div>
        }
      >
        {data.map((item) => (
          <TableRow key={item.doctor_id as Key}>
            {columns.map((column) => (
              <TableCell key={column.uid}>
                {renderCell(item, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
