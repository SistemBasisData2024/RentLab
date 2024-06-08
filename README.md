# Rentlab

Project "RentLab" adalah sebuah Website yang digunakan untuk peminjaman barang laboratorium yang ada di Fakultas Teknik Universitas Indonesia. Website ini terbagi menjadi dua pengguna yaitu user sebagai mahasiswa yang akan meminjam barang dan aslab sebagai pengguna yang mengatur barang laboratorium

Pada website ini, user yang merupakan mahasiswa juga, dapat meminjam barang/alat dari setiap laboratorium. User dapat memilih laboratorium yang ngin dipinjam barangnya yang ada pada list laboratorium, kemudian memilih barang yang ingin dipinjam berdasarkan jumlah ketersediaan yang ada. User harus memilih nama barang, julmah, alasan kebutuhan, serta jangka waktu peminjaman. Setiap request yang masuk akan disaring oleh aslab yang akan menentukan apakah request peminjaman diterima atau ditolak dengan keterangan. Jika peminjaman diterima, user dapat mengambil barang tersebut di lokasi lab yang sudah tertera.

# 📊 Diagram

## UML
![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/4c29308c-f4a0-41fa-bfbe-1c3f0a12310d)

## ERD
![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/62255806-359b-4f7d-bdb1-7297d2434ba9)

## FLOWCHART
![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/a2c94fa0-7321-40c1-9279-9da014671beb)

# 💻 Installation Guide

Clone this repository

```
git clone https://github.com/SistemBasisData2024/RentLab.git
```

## Frontend

- Ensure You’re on the right folder

  ![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/86f8112a-4530-47d4-894e-90bec59b9ebb)

- Run npm install to install all dependencies
  ```
   npm install
  ```
- To test the installation result run
  ```
  npm run dev
  ```
   ![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/249fa243-5523-48c6-a2bf-11ec82e59793)

## Backend

- Ensure You’re on the right folder
  
  ![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/883e3f33-c8dc-428f-bcaa-4510e9109548)


- Run npm install to install all dependencies
  ```
   npm install
  ```
- Create an .env file in your project root folder and add your variables.

  ![image](https://github.com/SistemBasisData2024/RentLab/assets/144201055/bffa47a8-aff7-406c-9c1d-0b1b4c59a3e7)

- Insert Database Variables

- To test the installation result run
  ```
   npm run start
  ```
  
# LIST API

## Backend
USER

  - Login User =  http://localhost:8463/user/login

  - SignUp User =  http://localhost:8463/user/signup

  - Get User by npm =  http://localhost:8463/user/getUserById/:id


ASLAB

  - Login Aslab =  http://localhost:8463/aslab/login

  - SignUp Aslab =  http://localhost:8463/aslab/signup

  - Get Aslab by npm =  http://localhost:8463/aslab/getAslabById/:id


BARANG

  - Get All Barang by idlab =  http://localhost:8463/barang/getBarang/:id

  - Create Barang =  http://localhost:8463/barang/addBarang

  - Edit Barang =  http://localhost:8463/barang/editBarang/:id

  - Delete Barang =  http://localhost:8463/barang/deleteBarang/:id


PINJAM

  - Create Pinjam =  http://localhost:8463/pinjam/addPinjam

  - Get History Pinjam from npm =  http://localhost:8463/pinjam/getPinjamUser/:id

  - Get All List Pinjam from lab_id =  http://localhost:8463/pinjam/getPinjamAslab/:id

  - Get All Pending and Rent from lab_id =  http://localhost:8463/pinjam//getPendingAndRent/:id

  - Delete pinjam =  http://localhost:8463/pinjam/deletePinjam/:id

  - Update pinjam =  http://localhost:8463/pinjam/updateKonfirmasi/:id


LAB
  - Get All Lab =  http://localhost:8463/lab/getAll


CLOUDINARY
  - Upload to cloudinary =  http://localhost:8463/cloudinary

## Frontend
USER

  - Login User = http://localhost:5173/user/login

  - SignUp User = http://localhost:5173/user/signup

  - History Pinjam User = http://localhost:5173/user/historyPinjam/:npm

  - Create Pinjaman User = http://localhost:5173/user/createPinjam/:barangId


ASLAB

  - Login Aslab = http://localhost:5173/aslab/login

  - SignUp Aslab = http://localhost:5173/aslab/signup

  - List Pinjam Aslab = http://localhost:5173/aslab/listPinjam/:labId

  - Create Barang Aslab = http://localhost:5173/aslab/createBarang
