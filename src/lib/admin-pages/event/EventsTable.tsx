import { FC } from "react";
import { Link } from "react-router-dom";
import { Edit, Eye, EyeOff, Trash2, Link2, User } from "lucide-react";
import { SERVER_URL } from "@/middleware/utils";
import { EventItem } from "./events";

interface EventsTableProps {
  events: EventItem[];
  selectedEvents: string[];
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectEvent: (id: string, checked: boolean) => void;
  onDeleteEvent: (id: string) => void;
  onToggleSuspend: (event: EventItem) => void;
  onOpenClaimModal: () => void;
  navigate: (path: string) => void;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const EventsTable: FC<EventsTableProps> = ({
  events,
  selectedEvents,
  allSelected,
  onSelectAll,
  onSelectEvent,
  onDeleteEvent,
  onToggleSuspend,
  onOpenClaimModal,
  navigate,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          title={`Go to page ${page}`}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-yellow-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <div
        className="bg-white rounded-lg border border-gray-200"
        title="Events table"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  title="Select all events"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th
                className="p-4 text-left font-medium"
                title="Event name"
              >
                Events Name
              </th>
              <th
                className="p-4 text-left font-medium"
                title="Event schedule"
              >
                Schedule
              </th>
              <th
                className="p-4 text-left font-medium"
                title="Event type"
              >
                Events Type
              </th>
              <th
                className="p-4 text-left font-medium"
                title="Actions"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b"
                title={`Event ${event.name}`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    title="Select event"
                    checked={selectedEvents.includes(event.id)}
                    onChange={(e) =>
                      onSelectEvent(event.id, e.target.checked)
                    }
                  />
                </td>
                <td className="p-4">
                  <div
                    className="flex items-center gap-3"
                    title="Event details"
                  >
                    <img
                      src={`${SERVER_URL}/uploads/event/${event.image}`}
                      alt={event.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      title="Event image"
                    />
                    <span
                      className="font-medium"
                      title="Event name"
                    >
                      {event.name}
                    </span>
                  </div>
                </td>
                <td className="p-4" title="Event schedule">
                  {event.schedule}
                </td>
                <td className="p-4" title="Event type">
                  {event.type}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/registered-user-event/${event.id}`}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="View registered users"
                    >
                      <span title="Users">
                        <User className="w-4 h-4" />
                      </span>
                    </Link>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="Edit event"
                      onClick={() => navigate(`/admin/edit-event/${event.id}`)}
                    >
                      <span title="Edit">
                        <Edit className="w-4 h-4" />
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title={
                        event.isSuspended
                          ? "Unsuspend event"
                          : "Suspend event"
                      }
                      onClick={() => onToggleSuspend(event)}
                    >
                      {event.isSuspended ? (
                        <span title="Unsuspend">
                          <EyeOff className="w-4 h-4" />
                        </span>
                      ) : (
                        <span title="Suspend">
                          <Eye className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="Generate claim link"
                      onClick={onOpenClaimModal}
                    >
                      <span title="Generate link">
                        <Link2 className="w-4 h-4" />
                      </span>
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="Delete event"
                      onClick={() => onDeleteEvent(event.id)}
                    >
                      <span title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                  title="No events found"
                >
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex justify-end mt-4 gap-1"
        title="Pagination"
      >
        {renderPaginationButtons()}
        {totalPages > 0 && (
          <>
            <button
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
              onClick={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
              disabled={currentPage === 1}
              title="Previous page"
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
              onClick={() =>
                currentPage < totalPages &&
                setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              title="Next page"
            >
              Next
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default EventsTable;
