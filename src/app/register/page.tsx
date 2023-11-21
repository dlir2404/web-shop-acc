'use client'
import React, { useState } from 'react';
import AuthModal from '../components/modals/auth';
import { Button, Modal } from 'antd';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <h3>Day la trang register</h3>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <AuthModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            ></AuthModal>
        </>
    )
}