--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: konfirmasi_status; Type: TYPE; Schema: public; Owner: kel11_owner
--

CREATE TYPE public.konfirmasi_status AS ENUM (
    'cancel',
    'rent',
    'pending',
    'success'
);


ALTER TYPE public.konfirmasi_status OWNER TO kel11_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aslab; Type: TABLE; Schema: public; Owner: kel11_owner
--

CREATE TABLE public.aslab (
    npm bigint NOT NULL,
    nama character varying(100) NOT NULL,
    lab_id integer,
    password text NOT NULL
);


ALTER TABLE public.aslab OWNER TO kel11_owner;

--
-- Name: barang; Type: TABLE; Schema: public; Owner: kel11_owner
--

CREATE TABLE public.barang (
    id integer NOT NULL,
    nama character varying(50) NOT NULL,
    lab_id integer,
    jumlah_ketersediaan integer,
    jumlah_rent integer,
    jumlah_total integer,
    image_url text
);


ALTER TABLE public.barang OWNER TO kel11_owner;

--
-- Name: barang_id_seq; Type: SEQUENCE; Schema: public; Owner: kel11_owner
--

CREATE SEQUENCE public.barang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.barang_id_seq OWNER TO kel11_owner;

--
-- Name: barang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kel11_owner
--

ALTER SEQUENCE public.barang_id_seq OWNED BY public.barang.id;


--
-- Name: lab; Type: TABLE; Schema: public; Owner: kel11_owner
--

CREATE TABLE public.lab (
    id integer NOT NULL,
    nama character varying(50) NOT NULL,
    lokasi text NOT NULL
);


ALTER TABLE public.lab OWNER TO kel11_owner;

--
-- Name: peminjaman; Type: TABLE; Schema: public; Owner: kel11_owner
--

CREATE TABLE public.peminjaman (
    id integer NOT NULL,
    user_npm bigint,
    user_nama character varying(100),
    barang_id integer,
    lab_id integer,
    barang_nama character varying(50),
    jumlah_barang integer NOT NULL,
    alasan_kebutuhan text,
    jangka_waktu integer NOT NULL,
    konfirmasi public.konfirmasi_status NOT NULL,
    created_at timestamp without time zone,
    jatuh_tempo timestamp without time zone
);


ALTER TABLE public.peminjaman OWNER TO kel11_owner;

--
-- Name: peminjaman_id_seq; Type: SEQUENCE; Schema: public; Owner: kel11_owner
--

CREATE SEQUENCE public.peminjaman_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.peminjaman_id_seq OWNER TO kel11_owner;

--
-- Name: peminjaman_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kel11_owner
--

ALTER SEQUENCE public.peminjaman_id_seq OWNED BY public.peminjaman.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: kel11_owner
--

CREATE TABLE public.users (
    npm bigint NOT NULL,
    nama character varying(100) NOT NULL,
    jurusan character varying(50) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO kel11_owner;

--
-- Name: barang id; Type: DEFAULT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.barang ALTER COLUMN id SET DEFAULT nextval('public.barang_id_seq'::regclass);


--
-- Name: peminjaman id; Type: DEFAULT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.peminjaman ALTER COLUMN id SET DEFAULT nextval('public.peminjaman_id_seq'::regclass);


--
-- Name: aslab aslab_pkey; Type: CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.aslab
    ADD CONSTRAINT aslab_pkey PRIMARY KEY (npm);


--
-- Name: barang barang_pkey; Type: CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.barang
    ADD CONSTRAINT barang_pkey PRIMARY KEY (id);


--
-- Name: lab lab_pkey; Type: CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.lab
    ADD CONSTRAINT lab_pkey PRIMARY KEY (id);


--
-- Name: peminjaman peminjaman_pkey; Type: CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (npm);


--
-- Name: aslab aslab_lab_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.aslab
    ADD CONSTRAINT aslab_lab_id_fkey FOREIGN KEY (lab_id) REFERENCES public.lab(id);


--
-- Name: barang barang_lab_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.barang
    ADD CONSTRAINT barang_lab_id_fkey FOREIGN KEY (lab_id) REFERENCES public.lab(id);


--
-- Name: peminjaman peminjaman_barang_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_barang_id_fkey FOREIGN KEY (barang_id) REFERENCES public.barang(id);


--
-- Name: peminjaman peminjaman_lab_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_lab_id_fkey FOREIGN KEY (lab_id) REFERENCES public.lab(id);


--
-- Name: peminjaman peminjaman_user_npm_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kel11_owner
--

ALTER TABLE ONLY public.peminjaman
    ADD CONSTRAINT peminjaman_user_npm_fkey FOREIGN KEY (user_npm) REFERENCES public.users(npm);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

