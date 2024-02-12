import contactService from "../service/contact-service.js";


const create = async (req, res, next) => {
  try {
    const result = await contactService.create(req.user, req.body);
    res.status(200).json({
      data: result
    })
  } catch (error) {
    next(error);
  }
}

const get = async (req, res, next) => {
  try {
    console.info(req.params);
    const contactId = req.params.contactId;
    const result = await contactService.get(req.user, contactId);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    req.body.id = req.params.contactId;
    const result = await contactService.update(req.user, req.body);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
}

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req.user, req.params.contactId);
    res.status(200).json({
      data: 'OK'
    });
  } catch (error) {
    next(error);
  }
}

const search = async (req, res, next) => {
  try {
    const request = {
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
      page: req.query.page,
      size: req.query.size
    }

    const result = await contactService.search(req.user, request);
    // res.status(200).json({
    //   data: result.data,
    //   paging: result.paging
    // });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  get,
  update,
  remove,
  search
}