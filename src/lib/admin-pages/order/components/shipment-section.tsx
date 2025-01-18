import { Ship } from 'lucide-react';
import React, { useState } from 'react';
import { FaEdit, FaTruck } from 'react-icons/fa';


const ShipmentSections:React.FC = () => {

  
      const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="flex items-center gap-6">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsShippingModalOpen(true)}
        >
          <FaTruck
            size={30}
            className="text-yellow-500"
          />
          <div className="mt-2 text-sm text-gray-600">Change Shipping</div>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsEditModalOpen(true)}
        >
          <FaEdit
            size={30}
            className="text-yellow-500"
          />
          <div className="mt-2 text-sm text-gray-600">Edit Info</div>
        </div>
      </div>
    )
}
export default ShipmentSections