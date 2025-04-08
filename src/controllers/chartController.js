import puppeteer from 'puppeteer';
import {getEquipoTipoStats, getLoginStats, getReparacionEstadoStats} from "../dao/chartsDao.js";

export const renderChartsPage = async (req, res) => {
    const loginStats = await getLoginStats();
    const reparacionStats = await getReparacionEstadoStats();
    const equipoStats = await getEquipoTipoStats();

    res.render('charts/index', {
        loginStats,
        reparacionStats,
        equipoStats
    });
};

export const generateChartsImage = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `${req.protocol}://${req.get('host')}/charts`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    const chartSection = await page.$('#chart-wrapper');
    const imageBuffer = await chartSection.screenshot({ type: 'png' });

    await browser.close();
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
};
